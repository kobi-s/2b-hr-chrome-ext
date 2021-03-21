chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			// This part of the script triggers when page is done loading

			function start() {
				var customerInpt = $("#MainContent_HoursGridView_InsCustomerDDL").parent();
				var emptCustomerInpt = $("#MainContent_HoursGridView_EmptyCustomerDDL").parent();
				var projectInpt = $("#MainContent_HoursGridView_InsProjectDDL").parent();
				var emptProjectInpt = $("#MainContent_HoursGridView_EmptyProjectDDL").parent();

				$("#MainContent_HoursGridView_InsCustomerDDL").attr("size", 10).width(180);
				$("#MainContent_HoursGridView_EmptyCustomerDDL").attr("size", 10).width(180);
				$("#MainContent_HoursGridView_InsProjectDDL").attr("size", 10).width(180);
				$("#MainContent_HoursGridView_EmptyProjectDDL").attr("size", 10).width(180);
				$("#MainContent_HoursGridView_InsWBSDDL").attr("size", 11).width(180);
				$("#MainContent_HoursGridView_EmptyWBSDDL").attr("size", 11).width(180);
				$("MainContent_HoursGridView_InsNewBT").height(190);
				$("MainContent_HoursGridView_InsNewBT").width(100);
				$(".page").width(1200);
				if(customerInpt.length) {
					customerInpt.append($("<input/>", {type: "search",id: "customSearchCustomer",placeholder: "חיפוש לקוח",}));
				} else {
					emptCustomerInpt.append($("<input/>", {type: "search",id: "customSearchCustomer",placeholder: "חיפוש לקוח",}));					
				}

				if(projectInpt.length) {
					projectInpt.append($("<input/>", {type: "search",id: "projectSearchCustomer",placeholder: "חיפוש פרויקט",}));
				} else {
					emptProjectInpt.append($("<input/>", {type: "search",id: "projectSearchCustomer",placeholder: "חיפוש פרויקט",}));					
				}

				var customerOptions = customerInpt.length ? $("#MainContent_HoursGridView_InsCustomerDDL option") : $("#MainContent_HoursGridView_EmptyCustomerDDL option") ;
				let initProejcts = []

				var customerValues = $.map(customerOptions, function (option) {
					return { value: option.value, text: option.text };
				});

				$("#customSearchCustomer").on("keyup", function (e) {
					var result = search(customerValues, e.target.value);
					setResults(result, customerInpt.length ? $("#MainContent_HoursGridView_InsCustomerDDL") : $("#MainContent_HoursGridView_EmptyCustomerDDL"));				
				});

				$("#MainContent_HoursGridView_InsCustomerDDL").on("change", function (e) {					
					setTimeout(() => {
						let first_proejcts = $("#MainContent_HoursGridView_InsProjectDDL option");
						initProejcts = $.map(first_proejcts, function (option) {
							return { value: option.value, text: option.text };
						});
					}, 950)
				});

				$("#MainContent_HoursGridView_EmptyProjectDDL").on("change", function (e) {					
					setTimeout(() => {
						let first_proejcts = $("#MainContent_HoursGridView_EmptyProjectDDL option") ;
						initProejcts = $.map(first_proejcts, function (option) {
							return { value: option.value, text: option.text };
						});
					}, 950)
				});

				$("#projectSearchCustomer").on("keyup", function (e) {
					let tmp_projects = $.map(initProejcts, function (option) {
						return { value: option.value, text: option.text };
					});
					var result = search(tmp_projects, e.target.value)
					setResults(result, !emptProjectInpt.length ? "#MainContent_HoursGridView_InsProjectDDL" : '#MainContent_HoursGridView_EmptyProjectDDL' );
				});

				$("input[title='שכפל שורה']").on("click", function () {
					setTimeout(() => {
						start()
					}, 1150)
				});

				function search(array, value) {
					return array.filter(
						(item) => item.text.toLowerCase().indexOf(value) > -1
					);
				}

				function setResults(results, element) {
					var options = "";
					for (var i = 0; i < results.length; i++) {
						options +=
							'<option value="' +
							results[i].value +
							'">' +
							results[i].text +
							"</option>";
					}

					$(element).html(options);
				}
			}

			setTimeout(() => {
				start()
			}, 1150)
		}
	}, 10);
});