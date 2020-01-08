import { Global, Module } from '@nestjs/common';
import { CacheManager } from './cache-manager.provider';

const CACHE_MODULE_OPTIONS = 'CACHE_MODULE_OPTIONS';

@Global()
@Module({
  providers: [
    {
      provide: CacheManager,
      useFactory: async (options) => {
        return await CacheManager.load(options);
      },
      inject: [CACHE_MODULE_OPTIONS],
    }
  ],
  exports: [CacheManager],
})
export class CacheModule {
  static forRoot(options) {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
