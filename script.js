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

function select_out() {
	let year = document.getElementById('year_select');
	let month = document.getElementById('month_select');
	let sorting = document.getElementById('sorting_select');
	let device = document.getElementById('device_select');

	let selection = [];

	let selected_device = document.getElementById("device_select").value;
	if (selected_device == "Все устройства") {

	}
	else {
		for (let device of devices) {
			
		}
	}

	
	return selection;
}

function update() {

	let year = document.getElementById('year_select');
	let month = document.getElementById('month_select');
	if (year.value == "Все время") {
		month.setAttribute("disabled","true");
	} 
	else {
		if (month.hasAttribute("disabled")) {
			month.removeAttribute("disabled");	
		}	
	}

	let select_list = document.getElementById(`device_select`);
	select_list.innerHTML = "";
	select_list.innerHTML += `<option selected value="Все устройства">Все устройства</option>`;
	for (let device of devices) {
		select_list.innerHTML += `<option value="` + device.name + `">` + device.name +`</option>`;
	}

	let table = document.getElementById(`energy_usage`);
	table.innerHTML = "";
	table.innerHTML += `<tr>
						<th></th>
						<th>Устройство</th>
						<th>Потребление</th>
						<th>Стоимость</th>
					</tr>`;

	let total_usage = totalUsage();
	let price = total_usage * tax();
	table.innerHTML += `<tr>
						<td><div class="device_color"></div></td>
						<td class="device_name">Главный счетчик</td>
						<td>`+total_usage+` кВт</td>
						<td>`+price+` ₽</td>
					</tr>`;
	document.getElementById(`total_price`).innerHTML = price + " ₽";

	for (let device of devices) {
		let device_usage = deviceUsage(device);
		price = device_usage * tax();
		table.innerHTML += `<tr>
							<td><div class="device_color" style="background-color: `+device.color+`"></div></td>
							<td class="device_name">`+device.name+`</td>
							<td>`+device_usage+` кВт</td>
							<td>`+price+` ₽</td>
						</tr>`
	}
}
