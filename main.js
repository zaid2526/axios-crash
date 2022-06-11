//GLOBLE INSTANCES
const axiosInstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});


// GET REQUEST
function getTodos() {
  console.log('GET Request');
  //method 1
  // axios({
  //   method:'get',
  //   //url:'https://jsonplaceholder.typicode.com/todos?_limit=5', when not using params,
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:5
  //   }
    
  // })
  // .then(res=>{
  //   showOutput(res)
  //   console.log(res)
  // })
  // .catch(err=>console.error(err));

  // //method 2
  // axios
  //   //.get('https://jsonplaceholder.typicode.com/todos?_limit=5') or may just limit
  //   //as an extra arguments
  //   .get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
  //   .then(res=>{
  //     showOutput(res);
  //     console.log(res.data);
  //   })
  //   .catch(err=>console.log(err))
  

  //method 3 with axios instances....
  axiosInstance.get('/todos',{params:{_limit:5}})
    .then(res=>{
      //console.log(res);
      showOutput(res)
    })
    .catch(err=>console.log(err))
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  // //method 1......
  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   data:{
  //     title:'new data',
  //   }
  // })
  // .then(res=>{
  //   showOutput(res)
  //   console.log(res)
  // })
  // .catch(err=>console.error(err));

  // //method 2.... cleaner way.....
  // axios.post('https://jsonplaceholder.typicode.com/todos', {
  //   title:'new data',
  //   compeleted:false
  // })
  // .then(res=>{
  //   showOutput(res)
  //   console.log(res)
  // })
  // .catch(err=>console.error(err));

  //method 3 with axios instances....
  axiosInstance.post('/todos',{
    title:'newly added data',
    completed:true
  })
    .then(res=>{
      //console.log(res);
      showOutput(res)
    })
    .catch(err=>console.log(err))

}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  // //method 1......
  // axios({
  //  // method:'put', when using put existing data will be replaced with newly sent data
  //  method:'patch',// while in only the field updated, which are being sent by the patch method,
  //   url:'https://jsonplaceholder.typicode.com/todos/1',
  //   data:{
  //     title:'update todo',
  //     completed:true
  //   }
  // })
  // .then(res=>{
  //   showOutput(res)
  //   console.log(res)
  // })
  // .catch(err=>console.error(err));

  // //method 2.... cleaner way.....
  // // axios.put('https://jsonplaceholder.typicode.com/todos/1', {
  // //   title:'updated todo',
  // //   compeleted:true
  // // })
  // // or
  // axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
  //   title:'updated todo',
  //   compeleted:true
  // })
  // .then(res=>{
  //   showOutput(res)
  //   console.log(res)
  // })
  // .catch(err=>console.error(err));

  //method 3 with axios instances....
  // axiosInstance.put('/todos/1',{
  //   title:'updated todo',
  //   completed:true
  // })
  axiosInstance.patch('/todos/1',{
    title:'updated todo',
    completed:true
  })
    .then(res=>{
      //console.log(res);
      showOutput(res)
    })
    .catch(err=>console.log(err))


}

// DELETE REQUEST
function removeTodo() {
  axiosInstance.delete('/todos/1')
    .then(res=>{
      //console.log(res);
      showOutput(res)
    })
    .catch(err=>console.log(err));


}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  //method 1 make first request and after that make 2nd into the then but this is not best way...
  // axiosInstance.delete('/todos/1')
  //   .then(res=>{
  //     console.log(res);
  //     showOutput(res)
  //     axiosInstance.get('/todos')
  //       .then(res=>console.log(res.data))
  //       .catch(err=>console.error(err));
  //   })
  //   .catch(err=>console.log(err))

  // //method 2 using axios.all... its a cleaner way......
  // axios.all([
  //   axiosInstance.get('/todos'),
  //   axiosInstance('/posts')
  // ])
  //   .then(res=>{
  //     showOutput(res[0]);
  //     showOutput(res[1]);
  //   })
  //   .catch(err=>console.error(err));


  //method 3 using axios.all() with axios.spread, its spread the variable, and we get
  // a number of a variable into the then is the equal to the number of request made..
  // with axios.all
  axios.all([
    axiosInstance.get('/todos',{params:{_limit:5}}),
    axiosInstance.get('/posts',{params:{_limit:5}}),
    
  ])
    .then(axios.spread((todos,posts)=>{
      //console.log(todos);
      //console.log(posts);
      showOutput(todos);
    }))
    .catch(err=>console.error(err));

}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
      'content-type':'application/json',
      Authentication:'someToken'
    }
  }
  axios
    .post('https://jsonplaceholder.typicode.com/todos',{
      title:'header data sent',
      conmpleted:true
    })
    .then(res=>{
      showOutput(res);
      console.log("updatyed headrer",res.headers);
    })

  
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello World'
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })

  };
  
  axios(option).then(res=>showOutput(res)).catch(err=>console.error(err))

}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res=>showOutput(res))
    .catch(err=>{
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.error(err.response.headers);
      }else if(err.request){
        //request ws made but no response...
        console.error("error ",err.request);
      }else{
        console.error(err.message);
      }
    })

}

// CANCEL TOKEN
function cancelToken() {
  
  const source=axios.CancelToken.source();
  axios
    .get('https://jsonplaceholder.typicode.com/todos',{
      cancelToken:source.token
    })
    .then(res=>showOutput(res))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('request Cancel due to : ',thrown.message)

      }
      
    });
    if(true){
      source.cancel('canceled token')
    }

}

// INTERCEPTING REQUESTS & RESPONSES
// not working... don't know...
axios.interceptors.request.use(
  //console.log("ddgsuadg"),
  config=>{
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  error=>{
    return Promise.reject(error);
  }

);



// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
