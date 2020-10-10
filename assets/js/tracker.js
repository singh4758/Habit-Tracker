
(function(){
    let startDate = document.getElementById('startDate');
    let endDate = document.getElementById('endDate');
    let setDate = document.getElementById('setDate');
    let list_container = document.getElementById('list-daily-habit');
    const url = new URL(window.location.href);
    const habitId = url.searchParams.get("id");

    const setInitialStartEndMinMax = function(){
        let currentDate = moment().format('YYYY-MM-DD');
        let nintyDayBefore = moment().subtract(90,"days").format('YYYY-MM-DD');
        startDate.setAttribute("min",nintyDayBefore);
        startDate.setAttribute("max",currentDate);
        endDate.setAttribute("min",nintyDayBefore);
        endDate.setAttribute("max",currentDate);
    }

    setInitialStartEndMinMax();

    startDate.addEventListener('change',function(){
        endDate.setAttribute('min',startDate.value);
        endDate.setAttribute('max',moment().format('YYYY-MM-DD'));
    });

    endDate.addEventListener('change',function(){
        let nintyDayBefore = moment().subtract(90,"days").format('YYYY-MM-DD');
        startDate.setAttribute("min",nintyDayBefore);
        startDate.setAttribute('max',endDate.value);
    });

    setDate.addEventListener('click',function(){
        clear();
        if(startDate.value==""){
            window.alert('Please Select Start Date');
            return;
        }
        if(endDate.value==""){
            window.alert('Please Select End Date')
            return;
        }

        showDateList(moment(startDate.value),moment(endDate.value));
    });



    const fetchHabitfromDb = async function(id){
        const response = await fetch('/habit-tracker/find-habit/?id='+id);
        const data = await response.json();
        return data;
    }

    const clear = function(){
        list_container.innerHTML = "";
    }

    const updateDb = async function(date,value){
        let str = "/habit-tracker/update-habit/?id="+habitId+"&date="+date+"&value="+value;
        let res = await fetch(str);
        let data = await res.json();
    }


    const showDateList = async function(start,end){
        clear();
        let days = end.diff(start,'days');
        let i =0;
        while(i<=days){
            let habit = await fetchHabitfromDb(habitId);
            let list = document.createElement('li');
            let date = moment(end).subtract(i,'days').format('YYYY-MM-DD');
            let list_container = document.getElementById('list-daily-habit');
            let date_container = '<div class="date-container">'+date+'</div>';
            let habitTrack = document.createElement('div');
            habitTrack.setAttribute("class","habit-track");
            if(habit.habit_tracker[date]==undefined || habit.habit_tracker[date]==-1){
                habitTrack.setAttribute('style','background-color:grey');
            }
            else if(habit.habit_tracker[date]==1){
                habitTrack.setAttribute('style','background-color:green');
            }
            else if(habit.habit_tracker[date]==0){
                habitTrack.setAttribute('style','background-color:red');
            }
            list.innerHTML = date_container;
            list.appendChild(habitTrack);
            list.setAttribute("class","date-habit-container");
            list.onclick = async function(){
                let habit = await fetchHabitfromDb(habitId);
                if(habit.habit_tracker[date]==undefined || habit.habit_tracker[date]==-1){
                    habitTrack.setAttribute('style','background-color:green');
                    updateDb(date,1);
                    console.log('Successfully update to Done');
                }
                else if(habit.habit_tracker[date]==1){
                    habitTrack.setAttribute('style','background-color:red');
                    updateDb(date,0);
                    console.log('Successfully update to Not Done');
                }
                else if(habit.habit_tracker[date]==0){
                    habitTrack.setAttribute('style','background-color:grey');
                    updateDb(date,-1);
                    console.log('Successfully update to Untrack');
                }
            }
            list_container.appendChild(list);
            i++;
        }

    }

    showDateList(moment().subtract(6,'days'),moment());


})();