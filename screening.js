function screenFunc(){
    var filePath = 'screen.csv';
    question0(filePath);
    question5(filePath);
}

var question0=function(filePath){
    var rowConverter = function(d){
        return {
            school: d.School,
            student_id: parseInt(d['Student #']),
            comment: d.comment,
            date: d.date,
            dob: d.dob,
            ethnicity: d.ethnicity,
            follow_up: d.follow_up,
            gender: d.gender,
            hearing: d.hearing,
            language: d.language,
            month_year: d.month_year,
            od_axis: parseFloat(d.od_axis),
            od_cyl: parseFloat(d.od_cyl),
            od_re: parseInt(d.od_re),
            od_sph: parseFloat(d.od_sph),
            os_axis: parseFloat(d.os_axis),
            os_cyl: parseFloat(d.os_cyl),
            os_re: parseInt(d.os_re),
            os_sph: parseFloat(d.os_sph),
            pno: d.pno,
            result: d.result,
            room: d.room
        }
    };
    d3.csv(filePath, rowConverter).then(function(data){
        const height = 800;
        const width = 1400;
        const padding = 140;
        var svg = d3.select('#q0_plot')
            .append('svg')
                .attr('width', width)
                .attr('height', height)
        var my = ['Jul, 2017', 'Aug, 2017', 'Sep, 2017', 'Oct, 2017', 'Nov, 2017',
        'Dec, 2017', 'Jan, 2018', 'Feb, 2018', 'Mar, 2018', 'Apr, 2018',
        'May, 2018', 'Aug, 2018', 'Sep, 2018', 'Oct, 2018', 'Nov, 2018',
        'Dec, 2018', 'Jan, 2019', 'Feb, 2019', 'Mar, 2019', 'Apr, 2019',
        'May, 2019', 'Jun, 2019', 'Aug, 2019', 'Sep, 2019', 'Oct, 2019',
        'Nov, 2019', 'Dec, 2019', 'Jan, 2020', 'Feb, 2020', 'Mar, 2020',
        'Apr, 2020', 'May, 2020'];
        var dd = [];
        my.forEach(function(d){
            var dataDict = {};
            dataDict['month_year'] = d;
            var filtered = data.filter(j => j['month_year'] == d);
            dataDict['total_screened'] = filtered.length;
            var filteredAgain = filtered.filter(l => l['result'] == 'refer');
            dataDict['total_referred'] = filteredAgain.length;
            dd.push(dataDict)
        })
        const keys = ['total_referred', 'total_screened'];
        const color = d3.scaleOrdinal()
            .domain(keys)
            .range(['#96E4C3', '#013645'])
        const stackedData = d3.stack().keys(keys)(dd);
        var avgRef = Math.round(d3.mean(dd, d => d.total_referred))
        var avgScreen = Math.round(d3.mean(dd, d => d.total_screened))
        const xScale = d3.scaleBand()
            .domain(my)
            .range([padding, width-padding])
        const xAxis = svg.append('g')
            .attr('transform', 'translate(0,'+(height-padding)+')')
            .call(d3.axisBottom(xScale))
            .selectAll('text').attr('transform', 'rotate(325)')
            .style('text-anchor', 'end')
        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('x', width-100)
            .attr('y', height-50)
            .text('Time (month + year)')
        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('x', 20)
            .attr('y', 100)
            .text('Number of patients')
            .attr('text-anchor', 'start')
        const yScale = d3.scaleLinear()
            .domain([0, 3000])
            .range([height-padding, padding]);
        svg.append('g')
            .attr('transform', 'translate('+padding+',0)')
            .call(d3.axisLeft(yScale))
        svg.selectAll('mylayers')
            .data(stackedData)
            .join('path')
                .attr('fill', d => color(d.key))
                .attr('d', d3.area()
                    .x(function(d, i){ return xScale(d.data.month_year)})
                    .y0(function(d){ return yScale(d[0])})
                    .y1(function(d){ return yScale(d[1])})
                )
        svg.selectAll('circle')
            .data(keys)
            .join('circle')
                .attr('cx', width-300)
                .attr('cy', function(d, i){
                    return (100+20*i)
                })
                .attr('r', 5)
                .attr('fill', function(d){
                    if (d == 'total_referred'){
                        return '#96E4C3'
                    }
                    if (d == 'total_screened'){
                        return '#013645'
                    }
                })
        svg.append('text')
            .attr('x', 200)
            .attr('y', 105)
            .style('font-size', 14)
            .text('Average # screened per month: '+avgScreen)
        svg.append('text')
            .attr('x', 200)
            .attr('y', 125)
            .style('font-size', 14)
            .text('Average # referred per month: '+avgRef)
        svg.selectAll('mylabs')
            .data(keys)
            .join('text')
                .attr('x', width-290)
                .attr('y', function(d, i){
                    return (105+20*i)
                })
                .style('font-size', 14)
                .text(function(d){
                    if (d == 'total_referred'){
                        return 'Total Referred'
                    }
                    if (d == 'total_screened'){
                        return 'Total Screened'
                    }
                });
    })
}

var question5 = function(filePath){
    var rowConverter = function(d){
        return {
            school: d.School,
            student_id: parseInt(d['Student #']),
            comment: d.comment,
            date: d.date,
            dob: d.dob,
            ethnicity: d.ethnicity,
            follow_up: d.follow_up,
            gender: d.gender,
            hearing: d.hearing,
            language: d.language,
            month_year: d.month_year,
            od_axis: parseFloat(d.od_axis),
            od_cyl: parseFloat(d.od_cyl),
            od_re: parseInt(d.od_re),
            od_sph: parseFloat(d.od_sph),
            os_axis: parseFloat(d.os_axis),
            os_cyl: parseFloat(d.os_cyl),
            os_re: parseInt(d.os_re),
            os_sph: parseFloat(d.os_sph),
            pno: d.pno,
            result: d.result,
            room: d.room,
            zip_code: parseInt(d.zip_code)
        }
    };
    d3.csv(filePath, rowConverter).then(function(data){
        var width = 800;
        var height = 550;
        var svg = d3.select('#q5_plot')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        var zips = [...new Set(data.map(d => d.zip_code))];
        var ethnicities = [...new Set(data.map(d => d.ethnicity))];
        var dd = [];
        var curGroup = 'zip_code'
        zips.forEach(function(d){
            var dataDict = {};
            dataDict['zip_code'] = d;
            var filtered = data.filter(k => k.zip_code == d)
            dataDict['num_patients'] = filtered.length;
            dd.push(dataDict)
        })
        var ddEth = [];
        ethnicities.forEach(function(d){
            var dataDict2 = {};
            dataDict2['ethnicity'] = d;
            var filt = data.filter(k => k.ethnicity == d)
            dataDict2['num_patients'] = filt.length;
            ddEth.push(dataDict2)
        })
        var colorScale2 = d3.scaleSequential()
            .domain(d3.extent(ddEth, d => d.num_patients)).range(['#B7E0F9', '#01385A']);
        var sizeScale2 = d3.scaleLinear()
            .domain(d3.extent(ddEth, d => d.num_patients)).range([7, 75]);
        var colorScale = d3.scaleSequential()
            .domain(d3.extent(dd, d => d.num_patients)).range(['#B7E0F9', '#01385A']);
        var sizeScale = d3.scaleLinear()
            .domain(d3.extent(dd, d => d.num_patients)).range([7, 75]);
        var tooltip = d3.select('#q5_plot')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover = function(d){
            tooltip.style('opacity', 1)
            d3.select(this).style('stroke-width', 6).style('opacity', 1)
        }
        var mousemove = function(d, event){
            tooltip
                .html('<u>'+event[curGroup]+'</u>'+'<br>'+event.num_patients+' screened')
                .style('left', d.pageX-50).style('top', d.pageY-75)
        }
        var mouseleave = function(d){
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        svg.append('text')
            .attr('x', 10)
            .attr('y', 25)
            .text('(Between 2017-2020)')
        var node = svg.append('g')
            .selectAll('circle')
            .data(dd)
            .enter()
            .append('circle')
                .attr('class', 'node')
                .attr('r', d => sizeScale(d.num_patients))
                .attr('cx', width/2)
                .attr('cy', height/2)
                .style('fill', d => colorScale(d.num_patients))
                .style('fill-opacity', 0.8)
                .attr('stroke', 'black')
                .style('stroke-width', 1)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseleave', mouseleave)
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));
        var simulation = d3.forceSimulation()
            .force('center', d3.forceCenter().x(width / 2).y(height / 2))
            .force('charge', d3.forceManyBody().strength(0.1))
            .force('collide', d3.forceCollide().strength(1).radius(function(d){ return (sizeScale(d.num_patients)+3)}).iterations(1))
        simulation
            .nodes(dd)
            .on('tick', function(d){
                node
                    .attr('cx', function(d){ return d.x; })
                    .attr('cy', function(d){ return d.y; })
            });
        function dragstarted(d){
            if (!d3.event.active) simulation.alphaTarget(0.03).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event, d){
            d.fx = event.x;
            d.fy = event.y
        }
        function dragended(event, d){
            if (!event.active) simulation.alphaTarget(0.03);
            d.fx = null;
            d.fy = null;
        }
        d3.select('#display').on('change', function(event, d){
            var selected = d3.select(this).property('value')
            curGroup = selected;
            if (curGroup == 'zip_code'){
                node
                    .transition()
                    .duration(1000)
                    .data(dd)
                    .enter()
                    .join('circle')
                        .attr('class', 'node')
                        .attr('r', j => sizeScale(j.num_patients))
                        .attr('cx', width/2)
                        .attr('cy', height/2)
                        .style('fill', j => colorScale(j.num_patients))
                        .style('fill-opacity', 0.8)
                        .attr('stroke', 'black')
                        .style('stroke-width', 1)
                        .on('mouseover', mouseover)
                        .on('mousemove', mousemove)
                        .on('mouseleave', mouseleave)
                        .call(d3.drag()
                            .on('start', dragstarted)
                            .on('drag', dragged)
                            .on('end', dragended));
            }
            if (curGroup == 'ethnicity'){
                node
                    .transition()
                    .duration(1000)
                    .data(ddEth)
                    .enter()
                    .join('circle')
                        .attr('class', 'node')
                        .attr('r', j => sizeScale2(j.num_patients))
                        .attr('cx', width/2)
                        .attr('cy', height/2)
                        .style('fill', j => colorScale2(j.num_patients))
                        .style('fill-opacity', 0.8)
                        .attr('stroke', 'black')
                        .style('stroke-width', 1)
                        .on('mouseover', mouseover)
                        .on('mousemove', mousemove)
                        .on('mouseleave', mouseleave)
                        .call(d3.drag()
                            .on('start', dragstarted)
                            .on('drag', dragged)
                            .on('end', dragended));
            }
        })
    })
}