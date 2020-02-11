#!/bin/bash

#ltj: adds a few entries to db using default Sails devenv host info
curl 'http://localhost:1337/record/create?id=0c400685-9a83-448d-8a93-62743661f287&name=cylab-render&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry'

curl 'http://localhost:1337/record/create?id=64e69e91-8074-4a3b-80aa-acd7f64307b0&name=cylab-earth&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=earth%26theme=starry'

curl 'http://localhost:1337/record/create?id=af3f5976-e179-4427-9763-51222f978854&name=cylab-guac&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=guac%26theme=starry'

curl 'http://localhost:1337/record/create?id=a3840e5d-947e-4df1-9088-05e69af60625&name=QR-arena1&lat=40.444062&long=-79.9471552&ele=0&url=https://atlas.conix.io'
