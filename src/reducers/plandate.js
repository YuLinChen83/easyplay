const initinalState = {
    inputData: {
        name: '',
        preferdate: [],
        enabledate: []
    },
    selectlist: [
        {
            name: 'Ｔiffany',
            preferdate: [
                '2019-02-15',
                '2019-02-17',
                '2019-02-28',
            ],
            enabledate: [
                '2019-02-13',
                '2019-02-14',
                '2019-02-27',
            ]
        }, {
            name: 'Sara',
            preferdate: [
                '2019-02-15',
                '2019-02-17',
                '2019-02-28',
            ],
            enabledate: [
                '2019-02-13',
                '2019-02-14',
                '2019-02-27',
            ]
        }, {
            name: 'Tyler',
            preferdate: [
                '2019-02-15',
                '2019-02-17',
                '2019-02-28',
            ],
            enabledate: [
                '2019-02-13',
                '2019-02-14',
                '2019-02-27',
            ]
        }, {
            name: 'Jack',
            preferdate: [
                '2019-02-15',
                '2019-02-17',
                '2019-02-28',
            ],
            enabledate: [
                '2019-02-13',
                '2019-02-14',
                '2019-02-27',
            ]
        }
    ]
}
    
const plandate = (state = initinalState, action) => {
    switch (action.type) {
      case 'ADD_DATE':
      console.log('ADD_DATE');
        return [
          ...state,
          ...action.payload
        ]
      default:
        return state
    }
  }
  
  export default plandate