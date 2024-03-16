'use node';
import ENVIRONMENT from './environment';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { httpAction } from './_generated/server';
import { GenericActionCtx } from 'convex/server';
import { getUserId, verifyWebhookPayload } from './utils';
import { ConvexError } from 'convex/values';
import { internal } from './_generated/api';
import { App } from 'octokit';

const YOUR_APP_ID = '851970';
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/Hjli+58OA7LQ
ju3ygANC8aNtjlmW/Fd/vRcJ420Q2J/UZT3zUhan09H8K6rmP7mfxKE5NnVbOlCY
tQzmi8Zczfu6FD236GhdtqYo3BjjSfQZCoVPczKd9Yvr3khVzeEbGMKtEa04aKRI
aDsdMAtVukynFzJaN9q/CR5nJe/QUbs8HQTydh4ShNFz68HN/dHJv9r6NHhdlELZ
plxAqyk8gbi+xRb0sida20E3jTPZS8vLBIf6hVFzIfuCUMszfo1qBux+qe5P+la5
VgqB7Ji0WUhrPy3zHFAjPv0N9USuZ4/pxZB0iyZXZyLQecHW1S46YXFgFY9jDlj2
q2R037BbAgMBAAECggEBAI1XePFvTY47xf7f9bImYkMcGdVoNXGoZb2exm8Vtw+C
ZZHa3hoZV4/+44kvclCeSFWUQffiAqDZW8nT/Bp0vNrdq5FObuaYBrdn4TLOs8lE
ZDYwxa6gb4rKkhR6a9ypShWUFkWQkR7qpLS4AR/w7DEWeqIIUcDPFgO6ZrW6JMVW
pQiRRLps3ghCBEIDnkTSx8WVRdQdR2esZwViSwmberUb2At0ZRXCtikjiggkkd2H
Zvi9pN0k34Q47wLg2XT4+nVn+giMd2iXWPnEqYa8HDUTjaH6NiL66kK/H96W5Fdb
Y0tIRm5v2exHk4G+AR4pLbtMeCbTcX6oGFKP76rlPoECgYEA6dgumD3Iba/eXYNU
e8OWix0UFw3SZ9NAS4KDTEV6OW5UcjWnMK9RSaOzNhlgxO8LVBOzpMf280/Cxwck
F7Xv+y8KZI4CGBpP1IpvKGt84Ks+VVkxp8qAZHE7DzAdGjScYN0O8gh3XPMmDhUf
HUDdgyH4EfkGLeIm1Y34pJjzGusCgYEA0Tm6VsGOxvxUihorkJ4pmir29eyplUyt
7uwZUgwEL/dMXm8w9BkYt3Rikg9UFCQSFynSqg3u6otxW4EctLozXhNWtJm5enKw
OcuIBm4K99rhQe5I+c2r4uszIoyS9VmInmBsEpDj45wmNUg5JBakV7luve4WSa6S
wXz6p7d5hFECgYEA3ktfn+G7kmnI3ORnf2+iwIPYAUJmbcRoLl/XKL4zPj0fkaJn
WOSQRYyUZC0jzJHhFv/TmiVtIEcGReUH7nJJu2IwYv6MBxWcJdOjb60efQTMsJ2l
knfyLYlmNz3prGuu7HW4K2TY80dBOcniVhC/glTcWVl9Akkl2YSohO/QyhkCgYBM
cnVdgbeziTsygsFsQ/4bcJtv3BtSjAP5ipbt3aoiBJAI6UPPzOO1FHd3utYTzeI2
SHfK3vBvDqhKsPBWMLrYIuTJdGnLDeDKHU4EW2zyhy1LM8/CRp4JebrjYs3HjAFZ
LQ4P8pTx83oaeds3DnbZ/s0x5K6MGZdRz2KeqXFjIQKBgE45/ED/StZ3FZtdeWFo
I8RynV8jThIFPyaNuWrlvLK1oin18BlepM0f14/2Hbm3bG/znKaMK/ad2D5sn5ap
MxTTKR5qPtJDbs4gTv/3VG4oZVM364ITLizHNkJGgAkDnt38EBW23ZiJaGr/WNcQ
JiIoF4iFcRBrY9diqHJE2h1m
-----END PRIVATE KEY-----
`;

export const getIssues = action({
  args: {
    githubUsername: v.string(),
    installationId: v.number(),
    state: v.union(v.literal('open'), v.literal('closed'), v.literal('all'))
  },
  async handler(ctx, { githubUsername, installationId, state }) {
    try {
      const app = new App({
        appId: YOUR_APP_ID,
        privateKey
      });
      const octokit = await app.getInstallationOctokit(installationId);
      const issues = await octokit.request('GET /issues', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      return issues.data;
    } catch (error) {
      throw error
      // console.error(`Error getting recent issues for ${githubUsername}: ${error}`);
    }
  }
});
