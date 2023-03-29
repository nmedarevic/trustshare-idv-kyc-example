import logo from './logo.svg';
import createSDK from '@trustshare/sdk';
import './App.css';
import { env } from "../env"

const trustshare = createSDK(env.publicKey);

function App() {
  const startVerification = async () => {

    console.log("Fetches client secret from the server...");
    const data = await fetch("http://localhost:4000/get-verification", { method: "GET", mode: 'cors' }).then((resp) => resp.json());
    console.log("Client secret successfully fetched", data);
    console.log("Initialising the client SDK...");
    trustshare.sdk.v1.confirmVerification(data.participantSecret).then((result) => console.log(result));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <p>

            <button onClick={startVerification}>Start verification</button>
          </p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
