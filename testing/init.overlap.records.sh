#!/bin/bash

# NOTE: ensure the port is correct for your Sails setup!
port=9001

#World global test scene
curl -u conix:conix "http://localhost:$port/record/create?id=16d17442-cb51-4005-a068-378e48a1ad5a&name=world-global&lat=85.0&long=-135.0&ele=0&radius=999999999999999&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"

#North American global test scene
curl -u conix:conix "http://localhost:$port/record/create?id=62019e0c-41bf-46d6-8a42-7a9841249412&name=north-america-global&lat=38.8756844&long=-104.75835945&ele=0&radius=5000000&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"
#European global test scene
curl -u conix:conix "http://localhost:$port/record/create?id=63331ee2-022b-4694-9c47-43fcd441c8eb&name=europe-global&lat=49.5&long=22.0&ele=0&radius=3000000&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"

# CMU global campus test scene:
curl -u conix:conix "http://localhost:$port/record/create?id=8a3a28c1-dfc8-4834-bb28-01b06179303d&name=cmu-campus-global&lat=40.4427314&long=-79.9429552&ele=284&radius=500&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"
# Pitt global campus test scene:
curl -u conix:conix "http://localhost:$port/record/create?id=b72fe676-6399-40a0-ba4f-3702595debb1&name=pitt-campus-global&lat=40.444353299999996&long=-79.960835&ele=305&radius=850&url=https://xr.andrew.cmu.edu/?name=%26mqttServer=oz.andrew.cmu.edu%26scene=render%26theme=starry"