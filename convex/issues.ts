import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

import ENVIRONMENT from './environment';
import { action } from './_generated/server';
import { v } from 'convex/values';
const YOUR_APP_ID = 851970;
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAvx45YvufDgOy0I7t8oADQvGjbY5ZlvxXf70XCeNtENif1GU9
81IWp9PR/Cuq5j+5n8ShOTZ1WzpQmLUM5ovGXM37uhQ9t+hoXbamKNwY40n0GQqF
T3MynfWL695IVc3hGxjCrRGtOGikSGg7HTALVbpMpxcyWjfavwkeZyXv0FG7PB0E
8nYeEoTRc+vBzf3Ryb/a+jR4XZRC2aZcQKspPIG4vsUW9LInWttBN40z2UvLywSH
+oVRcyH7glDLM36NagbsfqnuT/pWuVYKgeyYtFlIaz8t8xxQIz79DfVErmeP6cWQ
dIsmV2ci0HnB1tUuOmFxYBWPYw5Y9qtkdN+wWwIDAQABAoIBAQCNV3jxb02OO8X+
3/WyJmJDHBnVaDVxqGW9nsZvFbcPgmWR2t4aGVeP/uOJL3JQnkhVlEH34gKg2VvJ
0/wadLza3auRTm7mmAa3Z+EyzrPJRGQ2MMWuoG+KypIUemvcqUoVlBZFkJEe6qS0
uAEf8OwxFnqiCFHAzxYDuma1uiTFVqUIkUS6bN4IQgRCA55E0sfFlUXUHUdnrGcF
YksJm3q1G9gLdGUVwrYpI4oIJJHdh2b4vaTdJN+EOO8C4Nl0+Pp1Z/oIjHdol1j5
xKmGvBw1E42h+jYi+upCvx/eluRXW2NLSEZub9nsR5OBvgEeKS27THgm03F+qBhS
j++q5T6BAoGBAOnYLpg9yG2v3l2DVHvDlosdFBcN0mfTQEuCg0xFejluVHI1pzCv
UUmjszYZYMTvC1QTs6TH9vNPwscHJBe17/svCmSOAhgaT9SKbyhrfOCrPlVZMafK
gGRxOw8wHRo0nGDdDvIId1zzJg4VHx1A3YMh+BH5Bi3iJtWN+KSY8xrrAoGBANE5
ulbBjsb8VIoaK5CeKZoq9vXsqZVMre7sGVIMBC/3TF5vMPQZGLd0YpIPVBQkEhcp
0qoN7uqLcVuBHLS6M14TVrSZuXpysDnLiAZuCvfa4UHuSPnNq+LrMyKMkvVZiJ5g
bBKQ4+OcJjVIOSQWpFe5br3uFkmuksF8+qe3eYRRAoGBAN5LX5/hu5JpyNzkZ39v
osCD2AFCZm3EaC5f1yi+Mz49H5GiZ1jkkEWMlGQtI8yR4Rb/05olbSBHBkXlB+5y
SbtiMGL+jAcVnCXTo2+tHn0EzLCdpZJ38i2JZjc96axrrux1uCtk2PNHQTnJ4lYQ
v4JU3FlZfQJJJdmEqITv0MoZAoGATHJ1XYG3s4k7MoLBbEP+G3Cbb9wbUowD+YqW
7d2qIgSQCOlDz8zjtRR3d7rWE83iNkh3yt7wbw6oSrDwVjC62CLkyXRpyw3gyh1O
BFts8octSzPPwkaeCXm642LNx4wBWS0OD/KU8fN6GnnbNw522f7NMeSujBmXUc9i
nqlxYyECgYBOOfxA/0rWdxWbXXlhaCPEcp1fI04SBT8mjblq5byytaIp9fAZXqTN
H9eP9h25t2xv85ymjCv2ndg+bJ+WqTMU0ykeaj7SQ27OIE7/91RuKGVTN+uCEy4s
xzZCRoAJA57d/BAVtt2YiWhq/1jXECYiKBeIhXEQa2PXYqhyRNodZg==
-----END RSA PRIVATE KEY-----
`;
console.log(privateKey)

export const getAllIssues = action({
  args: { githubUsername: v.string(), installationId: v.number() },
  async handler(ctx, { installationId }) {
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: YOUR_APP_ID,
        privateKey,
        installationId
      }
    });

    // authenticates as app based on request URLs
    const {
      data: { slug }
    } = await octokit.rest.apps.getAuthenticated();

    // creates an installation access token as needed
    // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
    await octokit.rest.issues.create({
      owner: 'octocat',
      repo: 'hello-world',
      title: 'Hello world from ' + slug
    });
  }
});
