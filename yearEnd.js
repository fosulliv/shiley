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
        console.log(dates)
        console.log(data)
        var totalScreened = d3.sum(data, d => d.screened_total)
        var totalReferred = d3.sum(data, d => d.refer)
        var glassesTotal = d3.sum(data, d => d.rx_given)
        var totalExamined = d3.sum(data, d => d.exams_given)
        console.log(totalExamined, glassesTotal)
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
                                            .text('Examined: '+totalExamined)
                                        var caption4 = svg.append('text').attr('class', 'yearEndFont')
                                            .style('opacity', 0)
                                            .attr('x', 410)
                                            .attr('y', 140)
                                            .style('font-size', 18)
                                            .style('text-anchor', 'start')
                                            .text('(~44.3%)')
                                        var text7 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 770)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('Of those referred, '+totalExamined+', or')
                                        var text8 = svg.append('text')
                                            .attr('x', 100)
                                            .attr('y', 800)
                                            .attr('class', 'yearEndFont')
                                            .style('text-anchor', 'start')
                                            .style('opacity', 0)
                                            .text('about 44.3%, were examined on the')
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
                                            var length6 = path7.node().getTotalLength() * (1 - 0.4429081177520071364852809991079393398751115075825156110615521855);
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
                                                            .text('Given glasses: '+glassesTotal)
                                                        var caption6 = svg.append('text').attr('class', 'yearEndFont')
                                                            .style('opacity', 0)
                                                            .attr('x', 430)
                                                            .attr('y', 155)
                                                            .style('text-anchor', 'start')
                                                            .style('font-size', 18)
                                                            .text('(~32.0%)')
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
                                                            .text('to give out '+glassesTotal+' free pairs of')
                                                        var text15 = svg.append('text')
                                                            .attr('x', 100)
                                                            .attr('y', 1030)
                                                            .attr('class', 'yearEndFont')
                                                            .style('text-anchor', 'start')
                                                            .style('opacity', 0)
                                                            .text('glasses (nearly 1/3 of those examined)!')
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
                                                            var length8 = path9.node().getTotalLength();
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
                                                            var length9 = path10.node().getTotalLength() * (1 - 0.3202416918429003021148036253776435045317220543806646525679758308);
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