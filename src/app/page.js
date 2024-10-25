import CurrentTraffic from './components/arrivalsByAirport';
import ArrivalsTimeSeries from './components/arrivals';


const HomePage = async () => {
  const icao = 'e49406'; //sample
  const res = await fetch(`https://opensky-network.org/api/states/all?icao24=${icao}`);

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error('API error:', res.status, res.statusText, errorDetails);
    return (
      <div>
        <h1>Error {res.status}: {res.statusText}</h1>
        <pre>{errorDetails}</pre>
      </div>
    );
  }

  const data = await res.json(); 

  return (
    <div>
      <h1>OpenSky Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> 
      <h2>Graphs</h2>
    <ArrivalsTimeSeries/>
    <CurrentTraffic/>
    </div>

  );
};

export default HomePage;
