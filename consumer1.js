const getData = async () => {
    const response = await fetch('http://localhost:8080/getCustomerData');
    const json = await response.json();
    return json;
}

const printCustomers = async () => {
    const data = await getData();
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].name, data[i].email, data[i].status)
    }
}

printCustomers()

module.exports = {
	getData
}
