import * as React from "react";
import Layout from "./components/Layout";
import Button from "./components/Button";
import axios from "axios";

function App() {
  const [params, setParams] = React.useState("");
  const [list, setList] = React.useState<
    Array<{ uuid: string; suggestion: string; parent_uuid: string }>
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [errMessage, setErrMessage] = React.useState("");

  React.useEffect(() => {
    setLoading(true);

    axios
      .get(
        'https://api.dataatwork.org/v1/jobs/autocomplete?contains="software"'
      )
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("on Load fetching", err));
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    axios
      .get(`http://api.dataatwork.org/v1/jobs/autocomplete?contains=${params}`)
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrMessage(err.message);
      });
  };

  return (
    <Layout>
      <h1>React & ESBuild - Search Job</h1>

      <form onSubmit={onSubmit}>
        <input
          style={{ padding: 10, border: "1px solid black", fontSize: 20 }}
          value={params}
          disabled={loading}
          onChange={(e) => setParams(e.target.value)}
          placeholder="Search Job Suggestion"
        />
        <Button title="Search" type="submit" />
      </form>

      {loading ? (
        <h2>Loading...</h2>
      ) : errMessage ? (
        <h3>Suggestion found</h3>
      ) : (
        list.map((v) => {
          return (
            <div key={v.uuid}>
              <p>{v.suggestion}</p>
            </div>
          );
        })
      )}
    </Layout>
  );
}

export default App;
