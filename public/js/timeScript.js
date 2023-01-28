function time_form_input_handler(ev) {
	var div = ev.currentTarget;
    let d = div.childNodes[1];
    let h = div.childNodes[3];
    let m = div.childNodes[5];


	if (m.valueAsNumber == -1) {
		if (h.valueAsNumber > 0 || d.valueAsNumber > 0) {
			h.valueAsNumber--;
			m.valueAsNumber = 59;
		} else {
			m.valueAsNumber = 0;
		}
	} else if (m.valueAsNumber == 60) {
		h.valueAsNumber++;
		m.valueAsNumber = 0;
	}

	if (h.valueAsNumber == -1) {
		if (d.valueAsNumber > 0) {
			d.valueAsNumber--;
			h.valueAsNumber = 23;
		} else {
			h.valueAsNumber = 0;
		}
	} else if (h.valueAsNumber == 24) {
		d.valueAsNumber++;
		h.valueAsNumber = 0;
	}

	if (d.valueAsNumber == -1) {
		d.valueAsNumber = 0;
	}
}

div = document.querySelector('#timeForm')

if (div) div.addEventListener('input', time_form_input_handler);