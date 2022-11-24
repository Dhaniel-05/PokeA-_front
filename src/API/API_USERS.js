const getUsers = async()=>{
    const res1 = await fetch("http://localhost:35273/api/usuario");
    console.log(res1)
    const data1 = await res1.json();
    console.log(data1)
    return data1;
  }

  const registerUser = async (data)=>{
    console.log(data);
    // data = {
    //   "nombre": "Juan",
    //   "correo": "juan121222@gmail.com",
    //   "password": "w13j1h2j1"
    // }
    const res1 = await fetch("http://localhost:35273/api/usuario",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });
    const data1 = await res1.json();
    console.log(data1)
    return data1;
  }

  export {getUsers, registerUser}