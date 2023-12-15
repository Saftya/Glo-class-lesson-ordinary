'use strict'

const title = document.getElementsByTagName('h1')[0]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen');

const appData = {
title: '', 
screens: [], 
screenPrice: 0, 
adaptive: true,
rollback: inputRange.value, 
servicePricesPercent: 0,
servicePricesNumber: 0,
screenCount: 0,
fullPrice: 0,
servicePercentPrice: 0,
servicesPercent: {}, 
servicesNumber: {}, 
isError: false,
init: function(){
    appData.addTitle()
    startBtn.addEventListener('click', appData.start)
    buttonPlus.addEventListener('click', appData.addScreenBlock)
    inputRange.addEventListener('input', appData.trigger) 
},
trigger: function() {
    inputRangeValue.textContent = inputRange.value + "%"
},
addTitle: function(){
document.title = title.textContent
},

start: function(){
    appData.addScreens()
    appData.addServices()
    appData.addPrices()

    appData.showResult()
},
showResult: function(){
total.value = appData.screenPrice
totalCount.value = appData.screenCount
totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
fullTotalCount.value = appData.fullPrice
totalCountRollback.value = appData.servicePercentPrice
},

addScreens: function() {
    screens = document.querySelectorAll('.screen')

    screens.forEach(function(screen,index){
        const select = screen.querySelector('select')
        const input = screen.querySelector('input')
        const selectName = select.options[select.selectedIndex].textContent

        screen.length = 1;
        screens = document.querySelectorAll('.screen')
        for (let i = 0; i < screen.length; i++) {
            
            if (select.value.trim().length === 0 || input.value.trim().length === 0) {
                appData.addScreens();
                appData.isError = true;

        }
else {
appData.isError = false;
screens = document.querySelectorAll('.screen');
appData.screens.push({
            id: index,
            name: selectName,
            price: +select.value * +input.value,
            count: input.value,
        })
    }
    }
})

},
addServices: function(){
otherItemsPercent.forEach(function(item){
    const check = item.querySelector('input[type=checkbox]')
    const label = item.querySelector('label')
    const input = item.querySelector('input[type=text]')

    if (check.checked){
    appData.servicesPercent[label.textContent] = +input.value
    }
})

otherItemsNumber.forEach(function(item){
    const check = item.querySelector('input[type=checkbox]')
    const label = item.querySelector('label')
    const input = item.querySelector('input[type=text]')

    if (check.checked){
    appData.servicesNumber[label.textContent] = +input.value
    }
})
},

addScreenBlock: function(){
    screens = document.querySelectorAll('.screen')
    document.querySelector('select').value = ""
    document.querySelector('input').value = ""
    const cloneScreen = screens[0].cloneNode(true)
    screens[screens.length - 1].after(cloneScreen)
    total.value = ""
    totalCount.value = ""
    totalCountOther.value = ""
    fullTotalCount.value = ""
    totalCountRollback.value = ""
},

addPrices: function () {
    for (let screen of appData.screens) {
        appData.screenPrice += +screen.price
    }

    for (let key in appData.servicesNumber){
    appData.servicePricesNumber += appData.servicesNumber[key]
    }

    for (let key in appData.servicesPercent){
    appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)}


    for (let screen of appData.screens) {
    appData.screenCount += +screen.count
    }
    
appData.rollback = inputRange.value 
appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent

appData.servicePercentPrice = +appData.fullPrice - (+appData.fullPrice * +appData.rollback/100)
console.log(appData.rollback);
console.log(appData.servicePercentPrice);
},

}

appData.init();





