import { Calculator } from '../../services/calculator-service'

const app = getApp()

const calculator = new Calculator()

Page({
    data: {
        topActive:0,
        radioActive:0,
        downpayRatioIndex:2,
        downpayRatioArray: ['1成', '2成', '3成', '4成', '5成','6成','7成','8成', '9成'],
        yearIndex:19,
        yearArray: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        accumulationFundMultipleIndex: 0,
        commercialMultipleIndex:0,
        multipleStrs:['基准利率','7折','7.5折','8折','85折','9折','9.5折','1.1倍','1.2倍','1.3倍','1.4倍'],
        multiples:[1, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95,1.1,1.2,1.3,1.4],

    },
    onLoad: function(options) {

        if (options.totalAmount == null) {
            wx.navigateBack()
        }

        this.setData({totalAmount: options.totalAmount / 100, loanAmount: Math.round(options.totalAmount * 0.7) / 100})

        let commercialInterestRate = app.services.cacheService.getStorage(null,'COMMERCIAL_INTEREST_RATE')
        let accumulationFundInterestRate = app.services.cacheService.getStorage(null,'ACCUMULATION_FUND_INTEREST_RATE')
        this.setData({commercialInterestRates: JSON.parse(commercialInterestRate), accumulationFundInterestRates: JSON.parse(accumulationFundInterestRate)})

        this.setData({commercialInterestRate: this.data.commercialInterestRates[19], accumulationFundInterestRate: this.data.accumulationFundInterestRates[19]})
    },
    onSetTopActive: function(e){
        let index = e.currentTarget.dataset.index
        this.setData({topActive: index, accumulationFundResult: null, commercialResult: null})
    },
    onSetRadioActive: function(e){
        let index = e.currentTarget.dataset.index
        this.setData({radioActive: index, accumulationFundResult: null, commercialResult: null})
        if(index == 2){
            this.setData({accumulationFundLoanAmount: this.data.loanAmount, commercialLoanAmount: 0})
        }
    },
    onCalculate:function(e){
        let diminishing = false
        if(this.data.topActive==1){
            diminishing = true
        }
        if(this.data.radioActive==0){
            let result = calculator.loan(this.data.loanAmount * 10000, (this.data.yearIndex + 1) * 12, this.data.accumulationFundInterestRate,diminishing)
            this.setData({accumulationFundResult: result})
        }else if(this.data.radioActive==1){
            let result = calculator.loan(this.data.loanAmount * 10000, (this.data.yearIndex + 1) * 12, this.data.commercialInterestRate,diminishing)
            this.setData({commercialResult: result})
        }else if(this.data.radioActive==2){
            let result

            if(this.data.accumulationFundLoanAmount <=0){
                this.setData({accumulationFundResult: null})
            }else{
                result= calculator.loan(this.data.accumulationFundLoanAmount * 10000, (this.data.yearIndex + 1) * 12, this.data.accumulationFundInterestRate,diminishing)
                this.setData({accumulationFundResult: result})
            }

            if(this.data.commercialLoanAmount <=0 ){
                this.setData({commercialResult: null})
            }else{
                result = calculator.loan(this.data.commercialLoanAmount * 10000, (this.data.yearIndex + 1) * 12, this.data.commercialInterestRate,diminishing)
                this.setData({commercialResult: result})
            }
        }
    },
    onHousePrice:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount<=0){
            app.services.utilService.showModal('房屋售价必须大于0')
            return
        }
        amount = Math.round(amount * 100) / 100
        this.setData({totalAmount: amount})

        let loanRatio = 1 - ((this.data.downpayRatioIndex + 1)/10)
        let loanAmount = Math.round(amount * 100 * loanRatio) / 100
        this.setData({loanAmount: loanAmount})
        if(this.data.radioActive==2){
            if(loanAmount <= this.data.accumulationFundLoanAmount){
                this.setData({accumulationFundLoanAmount: loanAmount, commercialLoanAmount: 0})
            }else{
                this.setData({commercialLoanAmount: Math.round((loanAmount - this.data.accumulationFundLoanAmount)*100)/100})
            }
        }
    },
    onDownpayRatio: function(e) {
        let index = parseInt(e.detail.value)
        this.setData({downpayRatioIndex: index})
        let loanRatio = 1 - ((index + 1)/10)
        this.setData({loanAmount: Math.round(this.data.totalAmount * 100 * loanRatio) / 100})
    },
    onLoanAmount:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount<0 || amount>this.data.totalAmount){
            app.services.utilService.showModal('贷款总额必须大于等于0且小于等于房屋售价')
            return
        }
        amount = Math.round(amount * 100) / 100
        this.setData({loanAmount: amount})
        if(this.data.radioActive==2){
            if(amount <= this.data.accumulationFundLoanAmount){
                this.setData({accumulationFundLoanAmount: amount, commercialLoanAmount: 0})
            }else{
                this.setData({commercialLoanAmount: Math.round((amount - this.data.accumulationFundLoanAmount)*100)/100})
            }
        }
    },
    onYearPicker: function(e) {
        let yearIndex = parseInt(e.detail.value)
        this.setData({yearIndex:yearIndex})
        this.setData({commercialInterestRate: Math.round(this.data.commercialInterestRates[yearIndex] * this.data.multiples[this.data.commercialMultipleIndex] * 100)/100,
            accumulationFundInterestRate: Math.round(this.data.accumulationFundInterestRates[yearIndex]  * this.data.multiples[this.data.accumulationFundMultipleIndex] * 100)/100})
    },
    onAccumulationFundPickerOpen: function(e) {
        this.setData({accumulationFundPickerActive: true})
    },
    onAccumulationFundPickerClose: function(e) {
        this.setData({accumulationFundPickerActive: false})
    },
    onAccumulationFundPicker: function(e) {
        let index = parseInt(e.currentTarget.dataset.index)
        this.setData({accumulationFundMultipleIndex: index,
            accumulationFundInterestRate: Math.round(this.data.accumulationFundInterestRates[this.data.yearIndex] * this.data.multiples[index] * 100) / 100})
    },
    onAccumulationFundInterestRate:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount< 0){
            app.services.utilService.showModal('公积金利率必须大于0')
            return
        }
        amount = Math.round(amount * 100) / 100
        this.setData({accumulationFundInterestRate: amount})
    },

    onCommercialPickerOpen: function(e) {
        this.setData({commercialPickerActive: true})
    },
    onCommercialPickerClose: function(e) {
        this.setData({commercialPickerActive: false})
    },
    onCommercialPicker: function(e) {
        let index = e.currentTarget.dataset.index
        this.setData({commercialMultipleIndex: index,
            commercialInterestRate: Math.round(this.data.commercialInterestRates[this.data.yearIndex] * this.data.multiples[index] * 100) / 100})
    },
    onCommercialInterestRate:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount< 0){
            app.services.utilService.showModal('商贷利率必须大于0')
            return
        }
        amount = Math.round(amount * 100) / 100
        this.setData({commercialInterestRate: amount})
    },
    onAccumulationFundLoanAmount:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount<0 || amount>this.data.loanAmount){
            app.services.utilService.showModal('公积金贷款总额必须大于等于0且小于贷款总额')
            return
        }
        amount = Math.round(amount * 100) / 100
        if(amount== this.data.loanAmount){
            this.setData({accumulationFundLoanAmount: amount, commercialLoanAmount: 0})
        }else{
            this.setData({accumulationFundLoanAmount: amount, commercialLoanAmount: Math.round((this.data.loanAmount - amount) * 100)/100})
        }
    },
    onCommercialLoanAmount:function(e){
        let amount = parseFloat(e.detail.value)
        if(amount<0 || amount>this.data.loanAmount){
            app.services.utilService.showModal('商贷总额必须大于等于0且小于等于贷款总额')
            return
        }
        amount = Math.round(amount * 100) / 100

        if(amount== this.data.loanAmount){
            this.setData({accumulationFundLoanAmount: 0, commercialLoanAmount: amount})
        }else{
            this.setData({accumulationFundLoanAmount: Math.round((this.data.loanAmount - amount) * 100)/100, commercialLoanAmount:amount })
        }
    }
})
