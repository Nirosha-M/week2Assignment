(function(){
	'use strict';

	var buyingList = [{name: "Cookies", quantity: 5},
						{name: "Comic books", quantity: 5},
						{name: "olives", quantity: 50},
						{name: "eggs", quantity: 17},
						{name: "Cartons of milk", quantity: 12}];

	angular.module("shoppingListApp", [])
	.controller("ToBuyController", ToBuyController)
	.controller("AlreadyBoughtController", AlreadyBoughtController)
	.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var buy = this;
		buy.buyingList = buyingList;
		buy.value = false;
		buy.counter = 5;
		buy.removeItem = function(index){
			ShoppingListCheckOffService.removeItem(index);
			buy.counter--;
			if(buy.counter == 0){
				buy.value = true;
			}
		}

	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;
		bought.items = ShoppingListCheckOffService.getItems();
		bought.status = ShoppingListCheckOffService.getStatus();;
	}

	function ShoppingListCheckOffService(){
		var service = this;
		service.status = true;
		var tobuy = buyingList;
		var bought = [];

		service.removeItem = function(itemIndex){
			var a = tobuy.splice(itemIndex, 1);
			var item = {
				name: a[0].name,
				quantity: a[0].quantity
			}
			bought.push(item);
			service.changeStatus();
		}
		service.getItems = function(){
			return bought;
		}
		service.changeStatus = function(){
			service.status = false;
		}
		service.getStatus = function(){
			return service.status;
		}
	}

}())
