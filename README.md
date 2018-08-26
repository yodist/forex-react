## Foreign Exchange App
This app is written in React and using API provided by https://exchangeratesapi.io/ to get the latest currency rates.

**Docker notes:**
Build image and run container

 - make sure the project is located under c:/Users/
 - run this ``
docker build -t sample-app .
``
- then this ``
docker run -it 
  -v ${PWD}:/usr/src/app 
  -v /usr/src/app/node_modules 
  -p 3000:3000 
  --rm sample-app
``
- if you want to rebuild and run again you need to make sure that the previous container is removed. Command to remove the container is: 
-- ``
docker container ls``
-- ``docker rm -f <container-name>
``




> Written with [StackEdit](https://stackedit.io/).