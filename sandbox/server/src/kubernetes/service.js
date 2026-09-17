import { k8sCoreV1Api } from "./config.js";

export const createService = async (sandboxId) => {
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sandboxId
            }
        },
        spec: {
            selector: {
                app: 'sandbox',
                sandboxId: sandboxId
            },
            ports: [
                {
                    protocol: 'TCP',
                    port: 80,
                    targetPort: 5173,
                    name:"http"
                }
            ],
            type: "clusterIP"
        }
    };
 const response = await k8sCoreV1Api.createNamespacedService({
    namespace: 'default',
    body: serviceManifest
   });

   //console.log('service created successfully', response.body.metadata.name);

   return response.body;
 

}

    