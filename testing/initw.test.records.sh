#!/bin/bash

#ltj: adds a few entries to db using default Sails devenv host info
curl 'http://localhost:1337/record/create?uuid=356a5dcd-9d22-4cde-85b0-1942b20f05e7&url=ltsyrealjones.com'

curl 'http://localhost:1337/record/create?uuid=db3c47f1-21d9-4eb7-99fc-a8b199ebcf8a&url=www.espn.com'
