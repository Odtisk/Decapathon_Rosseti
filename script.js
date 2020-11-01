devices[0].name = "Компьютер";
devices[1].name = "Освещение";
devices[2].name = "Холодильник";
devices[3].name = "Стиральная машина";
devices[4].name = "Микроволновка";
devices[5].name = "Другое";


$(function() {
    $('#month_select').on('change', function() {
      alert( this.value );
    })
});

function totalUsage() {
	let total_usage = 0;
	for (let device of devices) {
		total_usage += parseFloat(deviceUsage(device));
	}
	return (total_usage).toFixed(1);

}

function deviceUsage(device) {
	let device_usage = 0;
	for (let day of device.data) {
		device_usage += day.value;
	}
	return (device_usage / 1000).toFixed(1);
}

function tax() {
	return 4;
}


function update() {

	let year = document.getElementById('year_select');
	let month = document.getElementById('month_select');
	if (year.value == "0") {
		month.setAttribute("disabled","true");
	} 
	else {
		if (month.hasAttribute("disabled")) {
			month.removeAttribute("disabled");	
		}	
	}

	
	let total_usage = 0;
	let price = 0;

	let table = document.getElementById(`energy_usage`);
	table.innerHTML = "";
	table.innerHTML += `<tr>
						<th></th>
						<th>Устройство</th>
						<th>Потребление</th>
						<th>Стоимость</th>
					</tr>`;



	for (let device of devices) {

		let deviceAgr = {color: device.color, name: device.name, usage: 0}

		for (let data of device.data) {
			if (year.value == "0") {
				deviceAgr.usage += parseFloat((data.value/100));
			}
			else if (month.value == "0") {
				deviceAgr.usage += parseFloat((data.value/100));
			}
			else if (data.date.split('-')[0] == year.value && data.date.split('-')[1] == month.value) {
				deviceAgr.usage += parseFloat((data.value/100));
			}
		}
			total_usage += deviceAgr.usage;
		deviceAgr.usage = deviceAgr.usage.toFixed(1);
		price = (deviceAgr.usage * tax()).toFixed(1);
		table.innerHTML += `<tr>
							<td><div class="device_color" style="background-color: `+deviceAgr.color+`"></div></td>
							<td class="device_name">`+deviceAgr.name+`</td>
							<td>`+deviceAgr.usage+` кВт</td>
							<td>`+price+` ₽</td>
						</tr>`
	}
	price = (total_usage * tax()).toFixed(1);
	table.innerHTML += `<tr>
						<td><div class="device_color"></div></td>
						<td class="device_name">Главный счетчик</td>
						<td>`+total_usage.toFixed(1)+` кВт</td>
						<td>`+price+` ₽</td>
					</tr>`;
	document.getElementById(`total_price`).innerHTML = price + " ₽";
}

function sort() {
	let order = document.getElementById('sorting_select');
	if (order.value == "По приоритету") {

	}

	else if (order.value == "По потреблению") {

	}

	else if (order.value == "По минимальному") {

	}

}