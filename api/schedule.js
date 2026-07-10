export default async function handler(req, res) {
  const { gid } = req.query;
  const validGids = ['800329934', '332134412'];
  
  if (!validGids.includes(gid)) {
    return res.status(400).json({ error: 'Invalid gid' });
  }

  const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSEnn29Z8vE0RxPkFwep4aDEFPTDONRErGySf3Nx23XWblgtll_GkqdLaRroEqD_1jXweUqnc7LW_2-/pub?output=csv&gid=${gid}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Upstream error: ${response.status}`);
    const text = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
