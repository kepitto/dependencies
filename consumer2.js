const getData = async () => {
    const response = await fetch('http://localhost:8080/getCustomerData');
    const json = await response.json();
    return json;
}

const printCustomers = async () => {
    const data = await getData();
    for (let i = 0; i < data.length; i++) {
        aggregatedBalance = 0;
        for (let j = 0; j < data[i].products.length; j++) {
            aggregatedBalance += data[i].products[j].balance;
        }
        console.log(data[i].name, data[i].email, aggregatedBalance)
    }
}

printCustomers()