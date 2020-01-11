import { Logger } from '@nestjs/common';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Handlebars from 'handlebars';
import CSSInliner from 'css-inliner';
import RecursiveReadDir from 'fs-readdir-recursive';

/**
 * Original: https://github.com/nest-modules/mailer/blob/master/lib/adapters/handlebars.adapter.ts
 */
export class MailerHandlebarsAdapter {
  constructor (options) {
    this.options = {
      templateDir: null,
      ...options,
    };
    this.logger = new Logger(MailerHandlebarsAdapter.name);
    this.precompiledTemplates = {};
    this.handlebars = Handlebars.create();

    const partialsDir = Path.join(this.options.templateDir, '/partials');
    const partialsFiles = RecursiveReadDir(partialsDir);
    partialsFiles.forEach((partialPath) => {
      let [ , partialName, partialExt ] = partialPath.match(/^(.*)\.(.*)$/);
      if (
        !partialName || !partialExt
         || ['hbs', 'html'].indexOf(partialExt.toLowerCase()) === -1
         || ['/', '\\'].indexOf(partialName.substr(-1)) > -1
      ) return;
      partialName = partialName.replace(/\\/g, '/');
      this.logger.debug(`Handlebars partial '${partialName}' registered!`);
      this.handlebars.registerPartial(partialName, Fs.readFileSync(Path.join(partialsDir, partialPath), 'UTF-8'));
    });
  }

  compile(mail, callback, mailerOptions) {
    const templateExt = Path.extname(mail.data.template) || '.hbs';
    const templateName = Path.basename(mail.data.template, Path.extname(mail.data.template));
    const templateDir = Path.join(this.options.templateDir, Path.dirname(mail.data.template));
    const templatePath = Path.join(templateDir, templateName + templateExt);

    if (!this.precompiledTemplates[templateName]) {
      try {
        const template = Fs.readFileSync(templatePath, 'UTF-8');
        
        this.precompiledTemplates[templateName] = this.handlebars.compile(template, {
          ...mailerOptions,
          ...this.options,
        });
      } catch (err) {
        return callback(err);
      }
    }

    const rendered = this.precompiledTemplates[templateName]({
      ...this.options.context,
      ...mail.data.context,
    });
    
    const { dir } = Path.parse(templatePath);
    const inliner = new CSSInliner({ directory: dir });

    inliner.inlineCSSAsync(rendered).then((html) => {
      mail.data.html = html;
      return callback();
    });

  }
}
