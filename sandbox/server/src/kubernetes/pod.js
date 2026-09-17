import { k8sCoreV1Api } from "./config.js";

export async function createPod(sandboxId) {
    const podManifest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels:{
                app: `sandbox`,
                sandboxId: sandboxId
            }
        },
        spec: {
            containers: [
                {
                    image: 'node:20-alpine',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'sandbox-container',
                    ports: [{ containerPort: 5173 ,name:"http"}],
                    resources:{
                        limits:{
                            cpu:"500m",
                            memory:"1Gi"  
                        },
                        requests:{
                            cpu:"250m",
                            memory:"512Mi"
                        }
                    }
                }
            ]
        }
    };

   const response =await k8sCoreV1Api.createNamespacedPod({
    namespace: 'default',
    body: podManifest
   });

   //console.log('pod created sucessfully', response.body.metadata.name);

   return response.body;
}

