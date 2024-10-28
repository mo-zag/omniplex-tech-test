declare module 'sinon-chrome' {
    import * as sinon from 'sinon';
  
    export const runtime: {
      onMessage: sinon.SinonSpy;
    };
  
    export const tabs: {
      onUpdated: sinon.SinonSpy;
      sendMessage: sinon.SinonSpy;
    };
  
    export const storage: {
      local: {
        get: sinon.SinonSpy;
        set: sinon.SinonSpy;
      };
    };
  
    // Define other mocks for the chrome API that sinon-chrome provides as needed.
    // Example for other parts:
    export const browserAction: {
      onClicked: sinon.SinonSpy;
    };
  
    // You can add more mocks if needed
  }
  