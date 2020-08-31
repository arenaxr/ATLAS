#!/bin/bash

# NOTE:_On Adding New Records to this Script_
# running this script after adding new records is fine because nothing w
# the same UUID will be added again!

#TODO (vr) make URL's easier to read
#------------------------------------------------------------------------------

# NOTE: ensure the port is correct for your Sails setup!
port=9001

# CMU scenes:
curl -u conix:conix "http://localhost:$port/record/create?id=0c400685-9a83-448d-8a93-62743661f287&name=cylab-render&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"
curl -u conix:conix "http://localhost:$port/record/create?id=64e69e91-8074-4a3b-80aa-acd7f64307b0&name=cylab-earth&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=earth%26theme=starry"
curl -u conix:conix "http://localhost:$port/record/create?id=af3f5976-e179-4427-9763-51222f978854&name=cylab-guac&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=guac%26theme=starry"
curl -u conix:conix "http://localhost:$port/record/create?id=10af374b-e078-46c4-89a1-9e81ceb85954&name=cylab-heads&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=heads%26theme=starry"
curl -u conix:conix "http://localhost:$port/record/create?id=cd7ff303-165a-4dd8-871d-0f800d0a05a8&name=cylab-piano&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=piano%26theme=starry"
curl -u conix:conix "http://localhost:$port/record/create?id=afbc80da-ef0e-4f9f-813a-7f4c9d8ed796&name=cylab-northstar&lat=40.444318&long=-79.946544&ele=300&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=northstar%26theme=starry"

#------------------------------------------------------------------------------
# physical markers
curl -u conix:conix "http://localhost:$port/record/create?id=a3840e5d-947e-4df1-9088-05e69af60625&name=QR-arena1&lat=40.444062&long=-79.9471552&ele=0&url=https://atlas.conix.io"
