import "./pubsub.js"
import "./load.js"
import "./calendar.js"
import "./modal.js"


//example for a mock fetch 
export function mockFetch() { //response testing
    const coreFetch = window.fetch;
  
    window.fetch = (input, init) => {
        console.log(input);
      if (input === "/api/new-event?user-id=lfh323") {
        return new Promise((resolve) => {
          resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve(JSON.parse(init?.body)),
          });
        });
      } else if (input === "/api/new-event/error") {
        return new Promise((resolve) => {
          resolve({
            status: 500,
            ok: false,
          });
        });
      } else {
        return coreFetch(input, init);
      }
    };
  }

  mockFetch();