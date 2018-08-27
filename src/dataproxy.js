let dpInstance = null;


class dataProxy{
    data = null;

    constructor(){
        if(!dpInstance){
            this.data = [
                {id: '1', content:'Task 1', column:'B', indexInColumn:0, lane: 's1', isDirty: 0},
                {id: '2', content:'Task 2', column:'N', indexInColumn:0, lane: 's1', isDirty: 0},
                {id: '3', content:'Task 3', column:'B', indexInColumn:1, lane: 's1', isDirty: 0},
                {id: '4', content:'Task 4', column:'SD', indexInColumn:5, lane: 's1', isDirty: 0},
                {id: '5', content:'Task 5', column:'N', indexInColumn:1, lane: 's1', isDirty: 0},
                {id: '6', content:'Task 7', column:'B', indexInColumn:2, lane: 's1', isDirty: 0},
                {id: '7', content:'Task 8', column:'SA', indexInColumn:0, lane: 's1', isDirty: 0},
                {id: '8', content:'Task 9', column:'N', indexInColumn:2, lane: 's1', isDirty: 0},
                {id: '9', content:'Task 10', column:'B', indexInColumn:3, lane: 's1', isDirty: 0},
                {id: '10', content:'Task 11', column:'B', indexInColumn:4, lane: 's1', isDirty: 0},
                {id: '11', content:'Task 12', column:'SA', indexInColumn:1, lane: 's1', isDirty: 0},
                {id: '12', content:'Task 13', column:'B', indexInColumn:5, lane: 's1', isDirty: 0},
                {id: '13', content:'Task 14', column:'B', indexInColumn:6, lane: 's1', isDirty: 0},
                {id: '14', content:'Task 15', column:'SA', indexInColumn:2, lane: 's1', isDirty: 0},
                {id: '15', content:'Task 16', column:'B', indexInColumn:7, lane: 's1', isDirty: 0},
                {id: '16', content:'Task 17', column:'SA', indexInColumn:3, lane: 's1', isDirty: 0},
                {id: '17', content:'Task 18', column:'N', indexInColumn:3, lane: 's1', isDirty: 0},
                {id: '18', content:'Task 19', column:'SD', indexInColumn:0, lane: 's1', isDirty: 0},
                {id: '19', content:'Task 20', column:'B', indexInColumn:8, lane: 's1', isDirty: 0},
                {id: '20', content:'Task 21', column:'SD', indexInColumn:1, lane: 's1', isDirty: 0},
                {id: '21', content:'Task 22', column:'SD', indexInColumn:2, lane: 's1', isDirty: 0},
                {id: '22', content:'Task 23', column:'B', indexInColumn:9, lane: 's1', isDirty: 0},
                {id: '23', content:'Task 24', column:'N', indexInColumn:4, lane: 's1', isDirty: 0},
                {id: '24', content:'Task 25', column:'SD', indexInColumn:3, lane: 's1', isDirty: 0},
                {id: '25', content:'Task 26', column:'B', indexInColumn:10, lane: 's1', isDirty: 0},
                {id: '26', content:'Task 27', column:'SA', indexInColumn:4, lane: 's1', isDirty: 0},
                {id: '27', content:'Task 28', column:'B', indexInColumn:11, lane: 's1', isDirty: 0},
                {id: '28', content:'Task 29', column:'B', indexInColumn:12, lane: 's1', isDirty: 0},
                {id: '29', content:'Task 30', column:'N', indexInColumn:5, lane: 's1', isDirty: 0},
                {id: '30', content:'Task 31', column:'SA', indexInColumn:5, lane: 's1', isDirty: 0},
                {id: '31', content:'Task 32', column:'B', indexInColumn:13, lane: 's1', isDirty: 0},
                {id: '32', content:'Task 33', column:'SD', indexInColumn:4, lane: 's1', isDirty: 0},
                {id: '33', content:'Task 34', column:'B', indexInColumn:14, lane: 's1', isDirty: 0},
                {id: '34', content:'Task 35', column:'SA', indexInColumn:6, lane: 's1', isDirty: 0},
                {id: '35', content:'Task 36', column:'N', indexInColumn:6, lane: 's1', isDirty: 0},
                {id: '36', content:'Task 37', column:'B', indexInColumn:15, lane: 's1', isDirty: 0},
                {id: '37', content:'Task 38', column:'B', indexInColumn:16, lane: 's1', isDirty: 0},
                {id: '38', content:'Task 39', column:'N', indexInColumn:7, lane: 's1', isDirty: 0},
                {id: '39', content:'Task 40', column:'B', indexInColumn:17, lane: 's1', isDirty: 0},
                {id: '40', content:'Task 41', column:'B', indexInColumn:18, lane: 's1', isDirty: 0},
                {id: '41', content:'Task 42', column:'N', indexInColumn:8, lane: 's1', isDirty: 0},
                {id: '42', content:'Task 43', column:'B', indexInColumn:19, lane: 's1', isDirty: 0},
                {id: '43', content:'Task 44', column:'B', indexInColumn:20, lane: 's1', isDirty: 0},
                {id: '44', content:'Task 45', column:'N', indexInColumn:9, lane: 's1', isDirty: 0},
                {id: '45', content:'Task 46', column:'B', indexInColumn:21, lane: 's1', isDirty: 0},
                {id: '46', content:'Task 47', column:'B', indexInColumn:22, lane: 's1', isDirty: 0},
                {id: '47', content:'Task 47', column:'N', indexInColumn:10, lane: 's1', isDirty: 0},
                {id: '48', content:'Task 48', column:'B', indexInColumn:23, lane: 's1', isDirty: 0},

                {id: '49', content:'Task 49', column:'IA', indexInColumn:0, lane: 's2', isDirty: 0},
                {id: '50', content:'Task 50', column:'IW', indexInColumn:0, lane: 's2', isDirty: 0},
                {id: '51', content:'Task 51', column:'ID', indexInColumn:0, lane: 's2', isDirty: 0},
                {id: '52', content:'Task 52', column:'IA', indexInColumn:1, lane: 's2', isDirty: 0},
                {id: '53', content:'Task 53', column:'IW', indexInColumn:1, lane: 's2', isDirty: 0},
                {id: '54', content:'Task 54', column:'ID', indexInColumn:1, lane: 's2', isDirty: 0},
                {id: '55', content:'Task 55', column:'IA', indexInColumn:2, lane: 's2', isDirty: 0},
                {id: '56', content:'Task 56', column:'IW', indexInColumn:2, lane: 's2', isDirty: 0},
                {id: '57', content:'Task 57', column:'ID', indexInColumn:2, lane: 's2', isDirty: 0},
                {id: '58', content:'Task 58', column:'IA', indexInColumn:3, lane: 's2', isDirty: 0},
                {id: '59', content:'Task 59', column:'IW', indexInColumn:3, lane: 's2', isDirty: 0},
                {id: '60', content:'Task 60', column:'ID', indexInColumn:3, lane: 's2', isDirty: 0},
                {id: '61', content:'Task 61', column:'IA', indexInColumn:4, lane: 's2', isDirty: 0},
                {id: '62', content:'Task 62', column:'IW', indexInColumn:4, lane: 's2', isDirty: 0},
                {id: '63', content:'Task 63', column:'ID', indexInColumn:4, lane: 's2', isDirty: 0},
                {id: '64', content:'Task 64', column:'IA', indexInColumn:5, lane: 's2', isDirty: 0},
                {id: '65', content:'Task 65', column:'IW', indexInColumn:5, lane: 's2', isDirty: 0},

                {id: '66', content:'Task 66', column:'VA', indexInColumn:0, lane: 's2', isDirty: 0},
                {id: '67', content:'Task 67', column:'VD', indexInColumn:0, lane: 's2', isDirty: 0},
                {id: '68', content:'Task 68', column:'VA', indexInColumn:1, lane: 's2', isDirty: 0},
                {id: '69', content:'Task 69', column:'VD', indexInColumn:1, lane: 's2', isDirty: 0},
                {id: '70', content:'Task 70', column:'VA', indexInColumn:2, lane: 's2', isDirty: 0},
                {id: '71', content:'Task 71', column:'VD', indexInColumn:2, lane: 's2', isDirty: 0},
                {id: '72', content:'Task 72', column:'VA', indexInColumn:3, lane: 's2', isDirty: 0},
                {id: '73', content:'Task 73', column:'VD', indexInColumn:3, lane: 's2', isDirty: 0},
                {id: '74', content:'Task 74', column:'VA', indexInColumn:4, lane: 's2', isDirty: 0},
                {id: '75', content:'Task 75', column:'VD', indexInColumn:4, lane: 's2', isDirty: 0},
                {id: '76', content:'Task 76', column:'VA', indexInColumn:5, lane: 's2', isDirty: 0},
                {id: '77', content:'Task 77', column:'VD', indexInColumn:5, lane: 's2', isDirty: 0},
                {id: '78', content:'Task 78', column:'VA', indexInColumn:6, lane: 's2', isDirty: 0},
                {id: '79', content:'Task 79', column:'VD', indexInColumn:6, lane: 's2', isDirty: 0},
                {id: '80', content:'Task 80', column:'VA', indexInColumn:7, lane: 's2', isDirty: 0},
                {id: '81', content:'Task 81', column:'VD', indexInColumn:7, lane: 's2', isDirty: 0},
                {id: '82', content:'Task 82', column:'VA', indexInColumn:8, lane: 's2', isDirty: 0},
            ];
            
            dpInstance = this;
        }
        return dpInstance;
    };
}

export default dataProxy;