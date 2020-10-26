(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var toBuy = this;
	toBuy.items = ShoppingListCheckOffService.itemsToBuy;
	toBuy.buyItem = function(itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var alreadyBought = this;
	alreadyBought.items = ShoppingListCheckOffService.itemsAlreadyBought;
}

function ShoppingListCheckOffService() {
	var service = this;

	service.itemsToBuy =
	[{name: 'Tim tams', quantity: 10},
	{name: 'ANZAC biscuits', quantity: 4},
	{name: 'Scotch fingers', quantity: 4},
	{name: 'Milk arrowroots', quantity: 6},
	{name: 'Ginger nuts', quantity: 20},
	{name: 'Monte Carlos', quantity: 2}];

	service.itemsAlreadyBought = [];

	service.addItem = function (items, itemName, itemQuantity) {
		var item = {
			name: itemName,
			quantity: itemQuantity};
		items.push(item);
	};

	service.removeItem = function (items, itemIndex) {
		items.splice(itemIndex, 1);
	};

	service.buyItem = function (itemIndex) {
		// get name and quantity of item being bought
		var name = service.itemsToBuy[itemIndex].name;
		var quantity = service.itemsToBuy[itemIndex].quantity;
		// add item to list of bought items
		service.addItem(service.itemsAlreadyBought, name, quantity);
		// remove item from list of items to buy
		service.removeItem(service.itemsToBuy, itemIndex);
	};
}

})();
