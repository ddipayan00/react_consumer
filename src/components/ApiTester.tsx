import { useState } from 'react';
import axios from 'axios';
import './ApiTester.css';

const ApiTester = () => {
  const [url, setUrl] = useState('http://localhost:8000');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [library, setLibrary] = useState('fetch');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [requestDetails, setRequestDetails] = useState('');

  const handleHeaderChange = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const addHeaderField = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const deleteHeaderField = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const headerObj = headers.reduce((acc, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {} as Record<string, string>);

      let data;
      if (library === 'fetch') {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headerObj,
          },
          body: method !== 'GET' ? JSON.stringify(JSON.parse(requestBody)) : null,
        });
        data = await res.json();
      } else {
        const res = await axios({
          url,
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headerObj,
          },
          data: method !== 'GET' ? JSON.parse(requestBody) : null,
        });
        data = res.data;
      }
      setResponse(JSON.stringify(data, null, 2));
      setRequestDetails(`Headers: ${JSON.stringify(headerObj, null, 2)}\n${method !== 'GET' ? `Request Body: ${requestBody}` : `Query Params: ${url.split('?')[1] || ''}`}`);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="api-tester" style={{width:'100vh',height:'100%',backgroundColor:'white',color:'black'}} >
      <h2>API Tester</h2>
      <form onSubmit={handleSubmit} className="api-tester-form">
        <div className="form-group">
          <label style={{color:'black'}}>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            required
          />
        </div>
        <div className="form-group">
          <label style={{color:'black'}}>Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{color:'black'}}>Library:</label>
          <select
            value={library}
            onChange={(e) => setLibrary(e.target.value)}
          >
            <option value="fetch">Fetch</option>
            <option value="axios">Axios</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{color:'black'}}>Headers:</label>
          <div className="headers-container">
            {headers.map((header, index) => (
              <div key={index} className="header-field" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, e.target.value, header.value)}
                  placeholder="Header Key"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, header.key, e.target.value)}
                  placeholder="Header Value"
                />
                <button type="button" onClick={() => deleteHeaderField(index)} style={{ marginLeft: '10px' }}>Delete</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addHeaderField} style={{ marginTop: '10px' }}>Add Header</button>
        </div>
        {method !== 'GET' && (
          <div className="form-group">
            <label style={{color:'black'}}>Request Body:</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder="Enter JSON request body"
            />
          </div>
        )}
        <button type="submit" className="submit-button">Send</button>
      </form>
      {response && <h3 style={{color:'black'}}>Response:</h3>}
      {response && <pre className="response" style={{textAlign:'left',color:'white',backgroundColor:'black'}}>{response}</pre>}
      {requestDetails && <h3 style={{color:'black'}}>Request Details:</h3>}
      {requestDetails && <pre className="request-details" style={{padding:'10px',textAlign:'left',color:'white',backgroundColor:'black'}}>{requestDetails}</pre>}
    </div>
  );
};

export default ApiTester;
