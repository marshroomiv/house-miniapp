export class Calculator{
    rnd (num){
        return Math.round(num * 100) / 100
    }

    getNextInstalment(amount, installmentsNumber, interestRate, diminishing, capitalSum, interestSum){
        let capital
        let interest
        let installment
        let irmPow
        let interestRateMonth = interestRate / 1200

        if (diminishing) {
            capital = this.rnd(amount / installmentsNumber)
            interest = this.rnd((amount - capitalSum) * interestRateMonth)
            installment = capital + interest
        } else {
            irmPow = Math.pow(1 + interestRateMonth, installmentsNumber)
            installment = this.rnd(amount * ((interestRateMonth * irmPow) / (irmPow - 1)))
            interest = this.rnd((amount - capitalSum) * interestRateMonth)
            capital = installment - interest
        }

        return {
            capital: capital,
            interest: interest,
            installment: installment,
            remain: amount - capitalSum - capital,
            interestSum: interestSum + interest
        }
    }

    loan (amount, installmentsNumber, interestRate, diminishing = false) {
        if (!amount || amount <= 0 ||
            !installmentsNumber || installmentsNumber <= 0 ||
            !interestRate || interestRate <= 0) {
            throw new Error(`wrong parameters: ${amount} ${installmentsNumber} ${interestRate}`)
        }

        let installments = []
        let interestSum = 0
        let capitalSum = 0
        let sum = 0

        for (let i = 0; i < installmentsNumber; i++) {
            let inst = this.getNextInstalment(
                amount, installmentsNumber, interestRate, diminishing, capitalSum, interestSum
            )

            sum += inst.installment
            capitalSum += inst.capital
            interestSum += inst.interest
            /** adding lost sum on rounding */
            if (i === installmentsNumber - 1) {
                capitalSum += inst.remain
                sum += inst.remain
                inst.remain = 0
            }

            installments.push(inst)
        }

        return {
            installments: installments,
            amount: this.rnd(amount),
            interestSum: this.rnd(interestSum),
            capitalSum: this.rnd(capitalSum),
            sum: this.rnd(sum)
        }
    }
}