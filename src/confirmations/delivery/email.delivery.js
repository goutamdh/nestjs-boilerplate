export class EmailDelivery {
  constructor (confirmationsService) {
    this.confirmationsService = confirmationsService;
  }

  send (confirmation, to) {
    console.log(`E-mail sent to ${to} with confirmation's token: ${confirmation.token}`);
  }
  
}
