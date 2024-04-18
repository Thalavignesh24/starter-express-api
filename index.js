const express = require('express');
const app = express();
const os = require('os')



app.get("/vpn-detect",(req,res)=>{
  console.log(req?.headers);
   const interfaces = os.networkInterfaces();
   console.log(interfaces)
         for (const interfaceName in interfaces) {
             const interfaceInfo = interfaces[interfaceName];
             if (interfaceInfo) {
                 for (const interfaceDetail of interfaceInfo) {
                     if (interfaceDetail.family === 'IPv4' && !interfaceDetail.internal) {
                         if (interfaceDetail.netmask === '255.255.255.255') {
                             console.log(true);
                             return res.send({
                               message:"VPN Detected",
                               response:interfaces
                             });
                         }
                     }
                 }
             }
         }
         console.log(false);
         return res.send({
           message:"VPN Not Detected",
           response: interfaces
         })
});

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
