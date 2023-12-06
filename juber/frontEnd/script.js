const checkOutBtns = document.querySelectorAll('.btn')

const checkOut = async(e) => {
  try{
    const amount = e.currentTarget.dataset.index;
     const key = await fetch('http://localhost:4000/api/getkey');
      const data = await fetch('http://localhost:4000/api/checkout' , {
       method : "POST",
       headers: {"Content-Type": "application/json"},
       body : JSON.stringify({amount}),
      })

      const result = await data.json();
      const dataKey = await key.json();
      const {price , id} = result.order;

      var options = {
        key: dataKey.key,
        amount: price, 
        currency: "INR",
        name: "Spark Foundation",
        description: "Testing",
        image: "https://avatars.githubusercontent.com/u/34296950?v=4",
        order_id: id,
        prefill: {
            name: "John Doe",
            email: "sparkFoundation@gmail.com",
            contact: "34567894"
        },
        notes: {
            "address": "Rohini sector 21 delhi"
        },
        theme: {
            color: "#3399cc"
        }
    };
      const razor = new Razorpay(options);
      razor.open();
    }catch(err){
      console.log(err)
      alert("please run ur server with node js to intergate the payment");
      return;
    }
}


Array.from(checkOutBtns).forEach(btn => btn.addEventListener('click' , checkOut));
