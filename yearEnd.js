function yearEnd(){
    var filePath = 'Sheet3-Table 1.csv'
    endNumbers(filePath)
}

var endNumbers = function(filePath){
    var rowConverter = function(d){
        return {
            agency: d.Agency,
            bvat: parseInt(d.BVAT),
            date: d.Date,
            em_glasses: parseInt(d['EM Glasses']),
            exams_given: parseInt(d['Exams Given']),
            exams_scheduled: parseInt(d['Exams Scheduled']),
            fff: parseInt(d['FFF']),
            school: d.Location,
            missed: parseInt(d.Missed),
            oph: parseInt(d['OPH']),
            pass: parseInt(d.Pass),
            refer: parseInt(d.Refer),
            rx_given: parseInt(d['Rx Given']),
            screened_total: parseInt(d['Screened Total']),
            true_refers: parseInt(d['True Refers']),
            unable: parseInt(d.Unable),
            under_care: parseInt(d['Under Care']),
            zip: parseInt(d['ZIP'])
        }
    }
    d3.csv(filePath, rowConverter).then(function(data){
        var dates = [...new Set(data.map(d => d.date))]
        var totalScreened = d3.sum(data, d => d.screened_total)
        var totalReferred = d3.sum(data, d => d.refer)
        var glassesTotal = d3.sum(data, d => d.rx_given)
        var totalExamined = d3.sum(data, d => d.exams_given)
        var dd = {Screened: totalScreened}
        var dd2 = {Screened: totalScreened, Referred: totalReferred};
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        var width = 600;
        var height = 1200;
        var svg = d3.select('#animation').append('svg').attr('width', width).attr('height', height).attr('class', 'map')
        svg.append('path').attr('id', 'path1')
        var path = d3.path();
        path.arc(width/2, height/2, 150, 0, 180)
        var path2 = svg.append('path').attr('d', path).attr('transform', 'translate(0,-300)')
            .attr('fill', 'none')
            .attr('stroke-width', 60)
            .attr('stroke', '#174A66')
        var length = path2.node().getTotalLength();
        var isStarted = true;
        var button = d3.select('#toAdd').append('button').attr('class', 'custom-btn btn-3')
            .attr('id', 'buttonStart')
            .style('opacity', 0)
            .append('span').text('Next')
        var title = svg.append('text')
            .attr('x', (width/2)+5)
            .attr('y', 50)
            .style('text-anchor', 'middle')
            .style('opacity', 0)
            .attr('class', 'yearEndFont')
            .text('2021-2022 End of Year Numbers')
        const e = d3.easeQuadInOut
        path2.attr('stroke-dasharray', length + ' ' + length)
            .attr('stroke-dashoffset', length)
                .transition()
                .ease(e)
                .attr('stroke-dashoffset', 0)
                .duration(2000)
                .on('end', function(){
                    title.transition().duration(1000).delay(200)
                    .ease(d3.easeLinear)
                    .style('opacity', 1)
                    d3.select('#buttonStart')
                        .transition()
                        .delay(1400)
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .style('opacity', 1)
                    var text1 = svg.append('text').attr('x', 100).attr('y', 550)
                        .attr('class', 'yearEndFont')
                        .style('text-anchor', 'start')
                        .style('opacity', 0)
                        .text('In the 2021-2022 school year,')
                    var text2 = svg.append('text').attr('x', 100).attr('y', 580)
                        .attr('class', 'yearEndFont')
                        .style('text-anchor', 'start')
                        .style('opacity', 0)
                        .text('the EyeMobile screened a total of')
                    var text3 = svg.append('text').attr('x', 100).attr('y', 610)
                        .attr('class', 'yearEndFont')
                        .style('opacity', 0)
                        .style('text-anchor', 'start')
                        .text(totalScreened+' children.')
                    text1
                        .transition()
                        .delay(1100)
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .style('opacity', 1)
                    text2
                        .transition()
                        .delay(1200)
                        .duration(900)
                        .ease(d3.easeLinear)
                        .style('opacity', 1)
                    text3
                        .transition()
                        .delay(1300)
                        .duration(800)
                        .ease(d3.easeLinear)
                        .style('opacity', 1)
                    d3.select('#buttonStart')
                        .on('click', function(){
                            if (isStarted){
                            var dPath = d3.path();
                            dPath.arc(width/2, height/2, 150, 0, 180)
                            var path3 = svg.append('path').attr('d', dPath).attr('transform', 'translate(0,-300)')
                                .attr('fill', 'none')
                                .attr('stroke-width', 60)
                                .attr('stroke', '#9EDAFB')
                            var length2 = path3.node().getTotalLength();
                            path3.attr('stroke-dasharray', length2 + ' ' + length2)
                                .attr('stroke-dashoffset', length2)
                                .transition()
                                .ease(d3.easeLinear)
                                .attr('stroke-dashoffset', 0)
                                .duration(3000)
                                .attr('stroke', '#9EDAFB')
                            var dPath2 = d3.path();
                            dPath2.arc(width/2, height/2, 150, 0, 180)
                            var path4 = svg.append('path').attr('d', dPath2).attr('transform', 'translate(0,-300)')
                                .attr('fill', 'none')
                                .attr('stroke-width', 60)
                                .attr('stroke', '#174A66')
                            var length3 = path4.node().getTotalLength() * (1 - 0.2708710885586565180620997946115742418750755104506463694575329225);
                            path4.attr('stroke-dasharray', length3 + ' ' + length3)
                                .attr('stroke-dashoffset', length3)
                                .transition()
                                .ease(d3.easeLinear)
                                .attr('stroke-dashoffset', 0)
                                .duration(1000)
                                .attr('stroke', '#174A66')
                            var caption1 = svg.append('text').attr('class', 'yearEndFont')
                                .attr('x', 405)
                                .attr('y', 135)
                                .style('opacity', 0)
                                .style('font-size', 18)
                                .style('text-anchor', 'start')
                                .text('Referred: '+totalReferred)
                            var caption2 = svg.append('text').attr('class', 'yearEndFont')
                                .attr('x', 430)
                                .attr('y', 155)
                                .style('opacity', 0)
                                .style('font-size', 18)
                                .style('text-anchor', 'start')
                                .text('(~27.1%)')
                            var text4 = svg.append('text').attr('x', 100).attr('y', 660)
                                .attr('class', 'yearEndFont')
                                .style('text-anchor', 'start')
                                .style('opacity', 0)
                                .text('Of those screened, '+totalReferred+', or')
                            var text5 = svg.append('text').attr('x', 100).attr('y', 690)
                                .attr('class', 'yearEndFont')
                                .style('text-anchor', 'start')
                                .style('opacity', 0)
                                .text('about 27.1%, were referred for')
                            var text6 = svg.append('text').attr('x', 100).attr('y', 720)
                                .attr('class', 'yearEndFont')
                                .style('text-anchor', 'start')
                                .style('opacity', 0)
                                .text('further examination.')
                            caption1
                                .transition()
                                .delay(3000)
                                .duration(1000)
                                .ease(d3.easeLinear)
                                .style('opacity', 1)
                            caption2
                                .transition()
                                .delay(3000)
                                .duration(1000)
                                .ease(d3.easeLinear)
                                .style('opacity', 1)
                            text4
                                .transition()
                                .delay(500)
                                .duration(2000)
                                .ease(d3.easeLinear)
                                .style('opacity', 1)
                            text5
                                .transition()
                                .delay(600)
                                .duration(1900)
                                .ease(d3.easeLinear)
                                .style('opacity', 1)
                            text6
                                .transition()
                                .delay(700)
                                .duration(1800)
                                .ease(d3.easeLinear)
                                .style('opacity', 1)
                            var isStarted2 = true;
                            d3.select('#buttonStart')
                                .on('click', function(){
                                    if (isStarted2){
                                        caption1
                                            .transition()
                                            .duration(1000)
                                            .ease(d3.easeLinear)
                                            .style('opacity', 0)
                                        caption2
                                            .transition()
                                            .duration(1000)
                                            .ease(d3.easeLinear)
                                            .style('opacity', 0)
                                        var caption3 = svg.append('text').attr('class', 'yearEndFont')
                                            .style('opacity', 0)
                                            .attr('x', 385)
                                            .attr('y', 120)
                                            .style('font-size', 18)
                                            .style('text-anchor', 'start')
                                            .text('Examined: 1020')
                                        var caption4 = svg.append('text').attr('class', 'yearEndFont')
                                            .style('opacity', 0)
                                            .attr('x', 410)
                                            .attr('y', 140)
                                            .style('font-size', 18)
                                            .style('text-anchor', 'start')
                                            .text('(~45.5%)')
                                        var text7 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 770)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('Of those referred, 1020, or')
                                        var text8 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 800)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('about 45.5%, were examined on the')
                                        var text9 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 830)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('EyeMobile.')
                                        var text10 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 860)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('This rate is lower than expected due')
                                        var text11 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 890)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('to COVID safety concerns in some schools.')
                                        var dPath3 = d3.path();
                                        dPath3.arc(width/2, height/2, 150, 0, 180)
                                        var path5 = svg.append('path').attr('d', dPath3)
                                            .attr('transform', 'translate(0,-300)')
                                            .attr('fill', 'none')
                                            .attr('stroke-width', 60)
                                            .attr('stroke', '#9EDAFB')
                                        var length4 = path5.node().getTotalLength();
                                        path5.attr('stroke-dasharray', length4 + ' ' + length4)
                                            .attr('stroke-dashoffset', length4)
                                            .transition()
                                            .ease(e)
                                            .delay(1000)
                                            .attr('stroke-dashoffset', 0)
                                            .duration(3000)
                                            .attr('stroke', '#9EDAFB')
                                        sleep(3000).then(()=>{
                                            var dPath4 = d3.path();
                                            dPath4.arc(width/2, height/2, 150, 0, 180)
                                            var path6 = svg.append('path').attr('d', dPath4).attr('transform', 'translate(0,-300)')
                                                .attr('fill', 'none')
                                                .attr('stroke-width', 60)
                                                .attr('stroke', '#174A66')
                                            var length5 = path6.node().getTotalLength();
                                            path6.attr('stroke-dasharray', length5 + ' ' + length5)
                                                .attr('stroke-dashoffset', length5)
                                                .transition()
                                                .ease(e)
                                                .attr('stroke-dashoffset', 0)
                                                .duration(3000)
                                                .attr('stroke', '#174A66')
                                            var dPath5 = d3.path();
                                            dPath5.arc(width/2, height/2, 150, 0, 180)
                                            var path7 = svg.append('path').attr('d', dPath5).attr('transform', 'translate(0,-300)')
                                                .attr('fill', 'none')
                                                .attr('stroke-width', 60)
                                                .attr('stroke', '#9EDAFB')
                                            var length6 = path7.node().getTotalLength() * (1 - 0.4549509366636931311329170383586083853702051739518287243532560214);
                                            path7.attr('stroke-dasharray', length6 + ' ' + length6)
                                                .attr('stroke-dashoffset', length6)
                                                .transition()
                                                .ease(d3.easeQuadOut)
                                                .attr('stroke-dashoffset', 0)
                                                .duration(1000)
                                                .attr('stroke', '#9EDAFB')
                                            caption3
                                                .transition()
                                                .delay(2800)
                                                .duration(1000)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            caption4
                                                .transition()
                                                .delay(2800)
                                                .duration(1000)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            text7
                                                .transition()
                                                .delay(2000)
                                                .duration(2000)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            text8
                                                .transition()
                                                .delay(2100)
                                                .duration(1900)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            text9
                                                .transition()
                                                .delay(2200)
                                                .duration(1800)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            text10
                                                .transition()
                                                .delay(3200)
                                                .duration(2000)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            text11
                                                .transition()
                                                .delay(3300)
                                                .duration(1900)
                                                .ease(d3.easeLinear)
                                                .style('opacity', 1)
                                            var isStarted3 = true;
                                            d3.select('#buttonStart')
                                                .on('click', function(){
                                                    if (isStarted3){
                                                        caption3
                                                            .transition()
                                                            .duration(1000)
                                                            .ease(d3.easeLinear)
                                                            .style('opacity', 0)
                                                        caption4
                                                            .transition()
                                                            .duration(1000)
                                                            .ease(d3.easeLinear)
                                                            .style('opacity', 0)
                                                        var caption5 = svg.append('text').attr('class', 'yearEndFont')
                                                            .style('opacity', 0)
                                                            .attr('x', 405)
                                                            .attr('y', 135)
                                                            .style('font-size', 18)
                                                            .style('text-anchor', 'start')
                                                            .text('Given glasses: 676')
                                                        var caption6 = svg.append('text').attr('class', 'yearEndFont')
                                                            .style('opacity', 0)
                                                            .attr('x', 430)
                                                            .attr('y', 155)
                                                            .style('text-anchor', 'start')
                                                            .style('font-size', 18)
                                                            .text('(~66.3%)')
                                                        var text12 = svg.append('text')
                                                            .attr('x', 100)
                                                            .attr('y', 940)
                                                            .attr('class', 'yearEndFont')
                                                            .style('text-anchor', 'start')
                                                            .style('opacity', 0)
                                                            .text('With the limited examinations of the')
                                                        var text13 = svg.append('text')
                                                            .attr('x', 100)
                                                            .attr('y', 970)
                                                            .attr('class', 'yearEndFont')
                                                            .style('text-anchor', 'start')
                                                            .style('opacity', 0)
                                                            .text('2021-2022 school year, we were still able')
                                                        var text14 = svg.append('text')
                                                            .attr('x', 100)
                                                            .attr('y', 1000)
                                                            .attr('class', 'yearEndFont')
                                                            .style('text-anchor', 'start')
                                                            .style('opacity', 0)
                                                            .text('to give out 676 free pairs of')
                                                        var text15 = svg.append('text')
                                                            .attr('x', 100)
                                                            .attr('y', 1030)
                                                            .attr('class', 'yearEndFont')
                                                            .style('text-anchor', 'start')
                                                            .style('opacity', 0)
                                                            .text('glasses (nearly 2/3 of those examined)!')
                                                        var dPath6 = d3.path();
                                                        dPath6.arc(width/2, height/2, 150, 0, 180)
                                                        var path8 = svg.append('path').attr('d', dPath6)
                                                            .attr('transform', 'translate(0,-300)')
                                                            .attr('fill', 'none')
                                                            .attr('stroke-width', 60)
                                                            .attr('stroke', '#174A66')
                                                        var length7 = path8.node().getTotalLength();
                                                        path8.attr('stroke-dasharray', length7 + ' ' + length7)
                                                            .attr('stroke-dashoffset', length7)
                                                            .transition()
                                                            .ease(e)
                                                            .delay(1000)
                                                            .attr('stroke-dashoffset', 0)
                                                            .duration(3000)
                                                            .attr('stroke', '#174A66')
                                                        sleep(3000).then(() => {
                                                            var dPath7 = d3.path();
                                                            dPath7.arc(width/2, height/2, 150, 0, 180)
                                                            var path9 = svg.append('path').attr('d', dPath7)
                                                                .attr('transform', 'translate(0,-300)')
                                                                .attr('fill', 'none')
                                                                .attr('stroke-width', 60)
                                                                .attr('stroke', '#9EDAFB')
                                                            var length8 = path9.node().getTotalLength() ;
                                                            path9.attr('stroke-dasharray', length8 + ' ' + length8)
                                                                .attr('stroke-dashoffset', length8)
                                                                .transition()
                                                                .ease(e)
                                                                .attr('stroke-dashoffset', 0)
                                                                .duration(3000)
                                                                .attr('stroke', '#9EDAFB')
                                                            var dPath8 = d3.path();
                                                            dPath8.arc(width/2, height/2, 150, 0, 180)
                                                            var path10 = svg.append('path').attr('d', dPath8)
                                                                .attr('transform', 'translate(0,-300)')
                                                                .attr('fill', 'none')
                                                                .attr('stroke-width', 60)
                                                                .attr('stroke', '#174A66')
                                                            var length9 = path10.node().getTotalLength() * (1 - 0.6627450980392156862745098039215686274509803921568627450980392156);
                                                            path10.attr('stroke-dasharray', length9 + ' ' + length9)
                                                                .attr('stroke-dashoffset', length9)
                                                                .transition()
                                                                .ease(d3.easeQuadOut)
                                                                .attr('stroke-dashoffset', 0)
                                                                .duration(1000)
                                                                .attr('stroke', '#174A66')
                                                            caption5
                                                                .transition()
                                                                .delay(2800)
                                                                .duration(1000)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                            caption6
                                                                .transition()
                                                                .delay(2800)
                                                                .duration(1000)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                            text12
                                                                .transition()
                                                                .delay(2000)
                                                                .duration(2000)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                            text13
                                                                .transition()
                                                                .delay(2200)
                                                                .duration(1800)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                            text14
                                                                .transition()
                                                                .delay(2400)
                                                                .duration(1600)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                            text15
                                                                .transition()
                                                                .delay(2600)
                                                                .duration(1400)
                                                                .ease(d3.easeLinear)
                                                                .style('opacity', 1)
                                                        })
                                                        isStarted3 = false;
                                                        var isStarted4 = true;
                                                        d3.select('#buttonStart').on('click', function(){
                                                            if (isStarted4){
                                                                caption5.transition().duration(1000).style('opacity', 0)
                                                                caption6.transition().duration(1000).style('opacity', 0)
                                                                text15.transition().duration(1000).style('opacity', 0)
                                                                text14.transition().duration(1000).delay(200).style('opacity', 0)
                                                                text13.transition().duration(1000).delay(400).style('opacity', 0)
                                                                text12.transition().duration(1000).delay(600).style('opacity', 0)
                                                                text11.transition().duration(1000).delay(800).style('opacity', 0)
                                                                text10.transition().duration(1000).delay(1000).style('opacity', 0)
                                                                text9.transition().duration(1000).delay(1200).style('opacity', 0)
                                                                text8.transition().duration(1000).delay(1400).style('opacity', 0)
                                                                text7.transition().duration(1000).delay(1600).style('opacity', 0)
                                                                text6.transition().duration(1000).delay(1800).style('opacity', 0)
                                                                text5.transition().duration(1000).delay(2000).style('opacity', 0)
                                                                text4.transition().duration(1000).delay(2200).style('opacity', 0)
                                                                text3.transition().duration(1000).delay(2400).style('opacity', 0)
                                                                text2.transition().duration(1000).delay(2600).style('opacity', 0)
                                                                text1.transition().duration(1000).delay(2800).style('opacity', 0)

                                                                d3.selectAll('path').transition('1').duration(1500).style('opacity', 0)
                                                                d3.selectAll('path').transition('2').duration(4000)
                                                                    .attr('transform', 'translate(1000,-300)')
                                                                var dd3 = [{'month': 'August', 'days_out': 8, 'locations': 8, '18_19': 1, 'exams': 81, 'glasses': 68},
                                                                            {'month': 'September', 'days_out': 5, 'locations': 5, '18_19': 0, 'exams': 32, 'glasses': 23},
                                                                        {'month': 'October', 'days_out': 7, 'locations': 7, '18_19': 21, 'exams': 65, 'glasses': 42},
                                                                    {'month': 'November', 'days_out': 6, 'locations': 10, '18_19': 14, 'exams': 51, 'glasses': 39},
                                                                {'month': 'December', 'days_out': 3, 'locations': 3, '18_19': 12, 'exams': 44, 'glasses': 33},
                                                                {'month': 'January', 'days_out': 0, 'locations': 0, '18_19': 14, 'exams': 0, 'glasses': 0},
                                                                {'month': 'February', 'days_out': 7, 'locations': 10, '18_19': 12, 'exams': 79, 'glasses': 51},
                                                                {'month': 'March', 'days_out': 12, 'locations': 19, '18_19': 9, 'exams': 122, 'glasses': 91},
                                                                {'month': 'April', 'days_out': 16, 'locations': 22, '18_19': 19, 'exams': 262, 'glasses': 164},
                                                                {'month': 'May', 'days_out': 19, 'locations': 32, '18_19': 20, 'exams': 218, 'glasses': 153},
                                                                {'month': 'June', 'days_out': 16, 'locations': 23, '18_19': 19, 'exams': 240, 'glasses': 162},
                                                                {'month': 'July', 'days_out': 6, 'locations': 7, '18_19': 11, 'exams': 97, 'glasses': 69}];
                                                                var text16 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 600)
                                                                    .attr('class', 'yearEndFont')
                                                                    .text('Above is a chart of all the days the EyeMobile went')
                                                                    .style('opacity', 0)
                                                                var text17 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 630)
                                                                    .attr('class', 'yearEndFont')
                                                                    .text('out in each month of the 2021-2022 school year.')
                                                                    .style('opacity', 0)
                                                                var text18 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 675)
                                                                    .attr('class', 'yearEndFont')
                                                                    .text('The number of days out peaked in May and was')
                                                                    .style('opacity', 0)
                                                                var text19 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 705)
                                                                    .attr('class', 'yearEndFont')
                                                                    .text('higher at the end of the year when COVID')
                                                                    .style('opacity', 0)
                                                                var text20 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 735)
                                                                    .attr('class', 'yearEndFont')
                                                                    .text('restrictions were the lowest.')
                                                                    .style('opacity', 0)
                                                                var text21 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 780)
                                                                    .attr('class', 'yearEndFont')
                                                                    .style('font-size', 23)
                                                                    .style('font-weight', 600)
                                                                    .text('In total, the EyeMobile was out for 104')
                                                                    .style('opacity', 0)
                                                                var text22 = svg.append('text')
                                                                    .attr('x', 75)
                                                                    .attr('y', 810)
                                                                    .attr('class', 'yearEndFont')
                                                                    .style('font-size', 23)
                                                                    .style('font-weight', 600)
                                                                    .text('days in the 2021-2022 school year.')
                                                                    .style('opacity', 0)
                                                                sleep(4000).then(() => {
                                                                    var xScale = d3.scaleBand()
                                                                        .domain(dd3.map(d => d.month))
                                                                        .range([50, 550]).padding(0.2)
                                                                    var xAxis = svg.append('g')
                                                                        .attr('transform', 'translate(0,500)')
                                                                        .call(d3.axisBottom(xScale))
                                                                        .selectAll('text')
                                                                            .attr('class', 'yearEndFont')
                                                                            .style('font-size', 14)
                                                                            .attr('transform', 'translate(-10,0)rotate(-45)')
                                                                            .style('text-anchor', 'end')
                                                                            .style('opacity', 0)
                                                                    var yScale = d3.scaleLinear()
                                                                        .domain([0, d3.max(dd3, d => d.days_out)])
                                                                        .range([500, 100])
                                                                    var heightScale = d3.scaleLinear()
                                                                        .domain([0, d3.max(dd3, d => d.days_out)])
                                                                        .range([0, 400])
                                                                    var tooltip = d3.select('#animation')
                                                                        .append('div')
                                                                        .style('opacity', 0)
                                                                        .attr('class', 'tooltip2')
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
                                                                            .html('<u>'+event.month+'</u>'+'<br>Number of days out: '+event.days_out)
                                                                            .style('left', d.pageX-50).style('top', d.pageY-75)
                                                                    }
                                                                    var mouseleave = function(d){
                                                                        tooltip.style('opacity', 0)
                                                                        d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
                                                                    }
                                                                    var yAxis = svg.append('g')
                                                                        .call(d3.axisLeft(yScale))
                                                                        .attr('transform', 'translate(50,0)')
                                                                        .style('opacity', 0)
                                                                    xAxis.transition('3').duration(800).style('opacity', 1)
                                                                    yAxis.transition('4').duration(800).style('opacity', 1)
                                                                    var bars = svg.selectAll('mybar')
                                                                        .data(dd3)
                                                                        .join('rect')
                                                                            .attr('x', d => xScale(d.month))
                                                                            .attr('width', xScale.bandwidth())
                                                                            .attr('fill', '#174A66')
                                                                            .attr('height', d => heightScale(0))
                                                                            .attr('y', d => yScale(0))
                                                                            .style('opacity', 0.8)
                                                                            .on('mouseover', mouseover)
                                                                            .on('mousemove', mousemove)
                                                                            .on('mouseleave', mouseleave)
                                                                    sleep(800).then(()=>{
                                                                        bars
                                                                            .transition()
                                                                            .duration(800)
                                                                            .attr('y', d => yScale(d.days_out))
                                                                            .attr('height', d => heightScale(d.days_out))
                                                                            .delay((d,i) => {return i*150});
                                                                        text16.transition().delay(800).duration(800).style('opacity', 1)
                                                                        text17.transition().delay(800).duration(800).style('opacity', 1)
                                                                        text18.transition().delay(1600).duration(800).style('opacity', 1)
                                                                        text19.transition().delay(1600).duration(800).style('opacity', 1)
                                                                        text20.transition().delay(1600).duration(800).style('opacity', 1)
                                                                        text21.transition().delay(2800).duration(800).style('opacity', 1)
                                                                        text22.transition().delay(2800).duration(800).style('opacity', 1)
                                                                        isStarted4 = false;
                                                                        var isStarted5 = true;
                                                                        d3.select('#buttonStart').on('click', function(){
                                                                            if (isStarted5){
                                                                                text16.transition().duration(800).style('opacity', 0)
                                                                                text17.transition().duration(800).style('opacity', 0)
                                                                                text18.transition().duration(800).style('opacity', 0)
                                                                                text19.transition().duration(800).style('opacity', 0)
                                                                                text20.transition().duration(800).style('opacity', 0)
                                                                                text21.transition().duration(800).style('opacity', 0)
                                                                                text22.transition().duration(800).style('opacity', 0)
                                                                                yScale
                                                                                    .domain([0, d3.max(dd3, d => d.locations)])
                                                                                heightScale
                                                                                    .domain([0, d3.max(dd3, d => d.locations)])
                                                                                yAxis.transition().duration(800)
                                                                                    .call(d3.axisLeft(yScale))
                                                                                    .attr('transform', 'translate(50,0)')
                                                                                var mousemove2 = function(d, event){
                                                                                    tooltip
                                                                                        .html('<u>'+event.month+'</u>'+'<br>Number of locations visited: '+event.locations)
                                                                                        .style('left', d.pageX-50).style('top', d.pageY-75)
                                                                                }
                                                                                bars.transition()
                                                                                    .duration(800)
                                                                                    .ease(e)
                                                                                    .attr('y', d => yScale(d.locations))
                                                                                    .attr('height', d => heightScale(d.locations))
                                                                                    .delay((d, i) => {return i*150})
                                                                                bars
                                                                                    .on('mousemove', mousemove2)
                                                                                text16
                                                                                    .transition()
                                                                                    .delay(801)
                                                                                    .text('Above is a chart of the number of unique')
                                                                                text17
                                                                                    .transition()
                                                                                    .delay(801)
                                                                                    .text('locations the EyeMobile visited in each month.')
                                                                                text18
                                                                                    .transition()
                                                                                    .delay(801)
                                                                                    .text('The same pattern is seen in this chart, with the')
                                                                                text19
                                                                                    .transition()
                                                                                    .delay(801)
                                                                                    .text('number of locations visited peaking later in')
                                                                                text20
                                                                                    .transition()
                                                                                    .delay(801)
                                                                                    .text('the year.')
                                                                                text21.transition()
                                                                                    .delay(801)
                                                                                    .text('In total, the EyeMobile visited 146 different')
                                                                                text22.transition()
                                                                                    .delay(801)
                                                                                    .text('locations in the 2021-2022 school year.')
                                                                                text16.transition().delay(1200).duration(800).style('opacity', 1)
                                                                                text17.transition().delay(1200).duration(800).style('opacity', 1)
                                                                                text18.transition().delay(1800).duration(800).style('opacity', 1)
                                                                                text19.transition().delay(1800).duration(800).style('opacity', 1)
                                                                                text20.transition().delay(1800).duration(800).style('opacity', 1)
                                                                                text21.transition().delay(3000).duration(800).style('opacity', 1)
                                                                                text22.transition().delay(3000).duration(800).style('opacity', 1)
                                                                            isStarted5 = false;
                                                                            var isStarted6 = true;
                                                                            d3.select('#buttonStart').on('click', function(){
                                                                                if (isStarted6){
                                                                                bars
                                                                                    .transition()
                                                                                    .duration(800)
                                                                                    .delay((d, i) => {return i*150})
                                                                                    .ease(e)
                                                                                    .attr('height', 0)
                                                                                    .attr('y', 500)
                                                                                yScale
                                                                                    .domain([0, d3.max(dd3, d => d.exams)]);
                                                                                heightScale
                                                                                    .domain([0, d3.max(dd3, d => d.exams)]);
                                                                                yAxis.transition().duration(1000)
                                                                                    .call(d3.axisLeft(yScale))
                                                                                text16.transition().duration(800).style('opacity', 0)
                                                                                text17.transition().duration(800).style('opacity', 0)
                                                                                text18.transition().duration(800).style('opacity', 0)
                                                                                text19.transition().duration(800).style('opacity', 0)
                                                                                text20.transition().duration(800).style('opacity', 0)
                                                                                text21.transition().duration(800).style('opacity', 0)
                                                                                text22.transition().duration(800).style('opacity', 0)
                                                                                const subgroups = ['exams', 'glasses'];
                                                                                const groups = data.map(d => d.month);
                                                                                d3.selectAll('rect').transition().delay(2499).remove();
                                                                                sleep(2500).then(() => {
                                                                                    const xSubGroup = d3.scaleBand()
                                                                                        .domain(subgroups)
                                                                                        .range([0, xScale.bandwidth()])
                                                                                        .padding([0.05])
                                                                                    const colorScale = d3.scaleOrdinal()
                                                                                        .domain(subgroups)
                                                                                        .range(['#174A66', '#9EDAFB'])
                                                                                    var tooltip2 = d3.select('#animation')
                                                                                        .append('div')
                                                                                        .style('opacity', 0)
                                                                                        .attr('class', 'tooltip2')
                                                                                        .style('background-color', 'white')
                                                                                        .style('border', 'solid')
                                                                                        .style('border-width', '2px')
                                                                                        .style('border-radius', '5px')
                                                                                        .style('padding', '5px')
                                                                                    var mouseover2 = function(d){
                                                                                        tooltip2.style('opacity', 1)
                                                                                        d3.select(this).style('stroke-width', 6).style('opacity', 1)
                                                                                    }
                                                                                    var mousemove3 = function(d, event){
                                                                                        var mouseoverText;
                                                                                        if (event.key == 'exams'){
                                                                                            mouseoverText = 'exams done.'
                                                                                        }
                                                                                        if (event.key == 'glasses'){
                                                                                            mouseoverText = 'pairs of glasses given out.'
                                                                                        }
                                                                                        tooltip2
                                                                                            .html('<u>'+event.month+'</u>'+`<br>${event.value} ${mouseoverText}`)
                                                                                            .style('left', d.pageX-50).style('top', d.pageY-75)
                                                                                    }
                                                                                    var mouseleave2 = function(d){
                                                                                        tooltip2.style('opacity', 0)
                                                                                        d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
                                                                                    }
                                                                                    var groupedBars = svg.append('g')
                                                                                        .selectAll('g')
                                                                                        .data(dd3)
                                                                                        .join('g')
                                                                                            .attr('transform', d => `translate(${xScale(d.month)}, 0)`)
                                                                                        .selectAll('rect')
                                                                                        .data(function(d) { return subgroups.map(function(key){ return {key: key, value: d[key], month: d['month']}; }); })
                                                                                        .join('rect')
                                                                                            .attr('x', d => xSubGroup(d.key))
                                                                                            .attr('y', d => 500)
                                                                                            .attr('width', xSubGroup.bandwidth())
                                                                                            .attr('height', 0)
                                                                                            .attr('fill', d => colorScale(d.key))
                                                                                            .style('opacity', 0.8)
                                                                                            .on('mouseover', mouseover2)
                                                                                            .on('mousemove', mousemove3)
                                                                                            .on('mouseleave', mouseleave2);
                                                                                    d3.selectAll('rect')
                                                                                        .transition()
                                                                                        .duration(800)
                                                                                        .ease(e)
                                                                                        .attr('y', d => yScale(d.value))
                                                                                        .attr('height', d => heightScale(d.value))
                                                                                        .delay((d, i) => {return i*150})
                                                                                    var legend1 = svg.append('circle')
                                                                                        .attr('cx', 80)
                                                                                        .attr('cy', 120)
                                                                                        .attr('r', 5)
                                                                                        .attr('fill', '#174A66')
                                                                                        .style('opacity', 0)
                                                                                    var legendText1 = svg.append('text')
                                                                                        .attr('x', 90)
                                                                                        .attr('y', 125)
                                                                                        .attr('class', 'yearEndFont')
                                                                                        .style('font-size', 14)
                                                                                        .text('# of exams')
                                                                                        .style('text-anchor', 'start')
                                                                                        .style('opacity', 0)
                                                                                    var legend2 = svg.append('circle')
                                                                                        .attr('cx', 80)
                                                                                        .attr('cy', 140)
                                                                                        .attr('r', 5)
                                                                                        .attr('fill', '#9EDAFB')
                                                                                        .style('opacity', 0)
                                                                                    var legendText2 = svg.append('text')
                                                                                        .attr('x', 90)
                                                                                        .attr('y', 145)
                                                                                        .attr('class', 'yearEndFont')
                                                                                        .style('font-size', 14)
                                                                                        .text('# of glasses given out')
                                                                                        .style('text-anchor', 'start')
                                                                                        .style('opacity', 0)
                                                                                    legend1.transition().delay(2000).duration(800).style('opacity', 1)
                                                                                    legend2.transition().delay(2000).duration(800).style('opacity', 1)
                                                                                    legendText1.transition().delay(2000).duration(800).style('opacity', 1)
                                                                                    legendText2.transition().delay(2000).duration(800).style('opacity', 1)
                                                                                    text16.transition()
                                                                                        .text('Above is a chart showing the number of')
                                                                                    text17.transition()
                                                                                        .text('exams and glasses given out each month.')
                                                                                    text21.transition()
                                                                                        .attr('y', 675)
                                                                                        .text('In total, we performed 1,020 exams and gave')
                                                                                    text22.transition()
                                                                                        .attr('y', 705)
                                                                                        .text('out 676 pairs of free glasses this school year.')
                                                                                    text16.transition().delay(2200).duration(800).style('opacity', 1)
                                                                                    text17.transition().delay(2200).duration(800).style('opacity', 1)
                                                                                    text21.transition().delay(2200).duration(800).style('opacity', 1)
                                                                                    text22.transition().delay(2200).duration(800).style('opacity', 1)
                                                                                    isStarted6 = false;
                                                                                })
                                                                            }
                                                                            })
                                                                            }
                                                                        })
                                                                    })
                                                                    

                                                                })
                                                                

                                                            }
                                                        })
                                                    }
                                                })
                                        })
                                        isStarted2 = false;
                                    }



                                })
                            isStarted = false;
                            }
                        })


                })

    })
}
