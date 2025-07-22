async function digestPW(password) {
    let pw = new TextEncoder().encode(password);
    pw = await crypto.subtle.digest('SHA-256', pw);
    pw = Array.from(new Uint8Array(pw));
    pw = pw.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return pw
}
  
export default digestPW;