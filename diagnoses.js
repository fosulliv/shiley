function assignment8(){
    var filePath="exam.csv";
    question1(filePath);
    question2(filePath);
    question3(filePath);
}

var question1=function(filePath){
    var rowConverter = function(d){
        return {
            age: parseInt(d.age),
            allergies: d.allergies,
            Amblyopia: parseInt(d.amblyopia),
            Astigmatism: parseInt(d.astigmatism),
            color: d.color,
            comments: d.comments,
            complaints: d.complaints,
            current_srx: d.current_srx,
            date: d.date,
            date_dt: d.date_dt,
            dbl: parseFloat(d.dbl),
            diagnosis: d.diagnosis,
            dilated: d.dilated,
            dilation_quality_od: d.dilation_quality_od,
            dilation_quality_os: d.dilation_quality_os,
            distance: d.distance,
            distance_od: parseFloat(d.distance_od),
            distance_os: parseFloat(d.distance_os),
            dob: d.dob,
            dob_dt: d.dob_dt,
            dry_od_axis: parseInt(d.dry_od_axis),
            dry_od_cyl: parseFloat(d.dry_od_cyl),
            dry_od_re: parseInt(d.dry_od_re),
            dry_od_sph: parseFloat(d.dry_od_sph),
            dry_os_axis: parseInt(d.dry_os_axis),
            dry_os_cyl: parseFloat(d.dry_os_cyl),
            dry_os_re: parseInt(d.dry_os_re),
            dry_os_sph: parseFloat(d.dry_os_sph),
            dry_ret_od_axis: parseInt(d.dry_ret_od_axis),
            dry_ret_od_cyl: parseFloat(d.dry_ret_od_cyl),
            dry_ret_od_score: parseFloat(d.dry_ret_od_score),
            dry_ret_od_sph: parseFloat(d.dry_ret_od_sph),
            dry_ret_os_axis: parseInt(d.dry_ret_os_axis),
            dry_ret_os_cyl: parseFloat(d.dry_ret_os_cyl),
            dry_ret_os_score: parseFloat(d.dry_ret_os_score),
            dry_ret_os_sph:  parseFloat(d.dry_ret_os_sph),
            emmetropia: parseInt(d.emmetropia),
            family_hx: d.family_hx,
            final_pd_od: parseFloat(d.final_pd_od),
            final_pd_os: parseFloat(d.final_pd_os),
            follow_up: d.follow_up,
            frame: d.frame,
            fundus: d.fundus,
            gestation: d.gestation,
            glasses: d.glasses,
            Hyperopia: parseInt(d.hyperopia),
            matching: d.matching,
            medical_hx: d.medical_hx,
            medications: d.medications,
            Myopia: parseInt(d.myopia),
            near: d.near,
            near_od: d.near_od,
            near_os: d.near_os,
            normal_bvat_oph: d.normal_bvat_oph,
            ocular_hx: d.ocular_hx,
            optometrist: d.optometrist,
            pd_od: parseFloat(d.pd_od),
            pd_os: parseFloat(d.pd_os),
            school: d.school,
            show: parseInt(d.show),
            size: parseFloat(d.size),
            slit_lamp: d.slit_lamp,
            srx_doctor: d.srx_doctor,
            srx_od_axis: parseFloat(d.srx_od_axis),
            srx_od_cyl: parseFloat(d.srx_od_cyl),
            srx_od_score: parseFloat(d.srx_od_score),
            srx_od_sph: parseFloat(d.srx_od_sph),
            srx_os_axis: parseFloat(d.srx_os_axis),
            srx_os_cyl: parseFloat(d.srx_os_cyl),
            srx_os_score: parseFloat(d.srx_os_score),
            srx_os_sph: parseFloat(d.srx_os_sph),
            student_id: parseInt(d.student_id),
            temple: parseFloat(d.temple),
            terms: d.terms,
            wet_od_axis: parseFloat(d.wet_od_axis),
            wet_od_cyl: parseFloat(d.wet_od_cyl),
            wet_od_re: parseFloat(d.wet_od_re),
            wet_od_sph: parseFloat(d.wet_od_sph),
            wet_os_axis: parseFloat(d.wet_os_axis),
            wet_os_cyl: parseFloat(d.wet_os_cyl),
            wet_os_re: parseFloat(d.wet_os_re),
            wet_os_sph: parseFloat(d.wet_os_sph),
            wet_ret_od_axis: parseFloat(d.wet_ret_od_axis),
            wet_ret_od_cyl: parseFloat(d.wet_ret_od_cyl),
            wet_ret_od_score: parseFloat(d.wet_ret_od_score),
            wet_ret_od_sph: parseFloat(d.wet_ret_od_sph),
            wet_ret_os_axis: parseFloat(d.wet_ret_os_axis),
            wet_ret_os_cyl: parseFloat(d.wet_ret_os_cyl),
            wet_ret_os_score: parseFloat(d.wet_ret_os_score),
            wet_ret_os_sph: parseFloat(d.wet_ret_os_sph),
            year: parseInt(d.year),
            zip_code: parseInt(d.zip_code)
        };
    };
    d3.csv(filePath, rowConverter).then(function(data){

        var svgheight = 1000;
        var svgwidth = 1000;
        var padding = 140;

        var curGroup = 'Astigmatism';
        var curDisplay = 'Percentage';
        var diags = ['Astigmatism', 'Hyperopia', 'Myopia', 'Amblyopia'];
        var zips = [...new Set(data.map(d => d.zip_code))];
        var dd = []
        zips.forEach(function(d){
            var dataDict = {}
            dataDict['zip'] = d;
            var onlyZip = data.filter(function(j){ return j['zip_code'] == d});
            diags.forEach(function(p){
                var averaged = d3.mean(onlyZip, l => l[p]);
                var totaled = d3.sum(onlyZip, l => l[p]);
                dataDict[p] = averaged;
                dataDict[p+'Total'] = totaled;
            })
            dd.push(dataDict);
        })

        var curMean = d3.mean(dd, d => d[curGroup])
        const svg = d3.select('#q1_plot').append('svg').attr('width', svgwidth).attr('height', svgheight)

        var tooltip = d3.select('#q1_plot').append('div').style('opacity', 0).attr('class', 'tooltip').style('background-color', 'white').style('border', 'solid').style('border-width', '2px').style('border-radius', '5px').style('padding', '5px');
        var mouseover = function(d){
            tooltip.style('opacity', 1)
            d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        var mousemove = function(d, e){
            var row = e
            var coordinates = [xScale(row.zip), yScale(row[curGroup])];
            tooltip.html('Zip Code: '+e.zip+'<br>'+curGroup+' Total: '+e[curGroup+'Total']+'<br>'+curGroup+' Rate: '+Math.round(e[curGroup]*100)+'%').style('left', d.pageX-90+'px').style('top', d.pageY-100+'px').style('font-size', 18)
        }
        var mouseleave = function(d){
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        const xScale = d3.scaleBand().domain(zips).range([padding, svgwidth-padding]).paddingInner(0.05);
        const yScale = d3.scaleLinear().domain([0, 1]).range([svgheight-padding, padding]);

        const yTotal = d3.scaleLinear().domain([0, d3.max(dd, d => d['HyperopiaTotal'])]).range([svgheight-padding, padding]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        
        var yLabel = svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 90)
            .attr('x', -(svgheight/2))
            .style('font-size', 18)
            .style('text-anchor', 'middle')
            .text('Rate of '+curGroup)
        
        svg.append('text')
            .attr('transform', 'translate('+(svgwidth/2)+' ,'+(svgheight-90)+')')
            .style('text-anchor', 'middle')
            .text('Zip Code')

        var xAx = svg.append('g').call(xAxis).attr('transform', 'translate(0, 860)').selectAll('text').attr('transform', 'rotate(325)').style('font-size', 9)
        var yAx = svg.append('g').call(yAxis).attr('transform', 'translate(140, 0)')

        var bars = svg.selectAll('rect').data(dd).enter().append('rect')
            .attr('width', xScale.bandwidth())
            .attr('height', function(d){
                return (svgheight - yScale(0) - padding)
            })
            .attr('x', function(d){
                return xScale(d.zip);
            })
            .attr('y', function(d){
                return yScale(0)
            })
            .style('opacity', 0.8)
            .attr('fill', '#172A54')
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);
        svg.selectAll('rect')
            .transition('starting')
            .duration(1000)
            .attr('y', d => yScale(d.Astigmatism))
            .attr('height', d => svgheight - yScale(d.Astigmatism) - padding)

        var avgLine = svg.append('line')
            .attr('x1', svgwidth/2)
            .attr('x2', svgwidth/2)
            .attr('y1', yScale(curMean))
            .attr('y2', yScale(curMean))
            .attr('stroke', 'red')
            .style('stroke-width', 3);
        
        avgLine
            .transition('s')
            .duration(2500)
            .attr('x1', padding)
            .attr('x2', svgwidth-padding);

        var avgText = svg.append('text')
            .attr('x', svgwidth-135)
            .attr('y', yScale(curMean))
            .html('Average: '+Math.round(curMean*100)+'%')
        function update(selectedGroup){
            curGroup = selectedGroup;
            if (curDisplay == 'Total'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yTotal(d[curGroup+'Total']) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip);
                    })
                    .attr('y', function(d){
                        return yTotal(d[curGroup+'Total'])
                    })
                curMean = d3.mean(dd, d => d[curGroup+'Total']);
                yLabel
                    .transition()
                    .duration(1000)
                    .text('Total number of '+curGroup)
                avgLine
                    .transition()
                    .duration(1000)
                    .attr('y1', yTotal(curMean))
                    .attr('y2', yTotal(curMean))
                avgText
                    .transition()
                    .duration(1000)
                    .attr('y', yTotal(curMean))
                    .text('Average: '+Math.round(curMean))
                
            }
            if (curDisplay == 'Percentage'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yScale(d[curGroup]) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip)
                    })
                    .attr('y', function(d){
                        return yScale(d[curGroup])
                    })
                yLabel
                    .transition()
                    .duration(1000)
                    .text('Rate of '+curGroup);
                curMean = d3.mean(dd, d => d[curGroup]);
                avgLine
                    .transition()
                    .duration(1000)
                    .attr('y1', yScale(curMean))
                    .attr('y2', yScale(curMean))
                avgText
                    .transition()
                    .duration(1000)
                    .attr('y', yScale(curMean))
                    .text('Average: '+Math.round(curMean*100)+'%')
            }
        };
        function updateDropdown(selectedDisplay) {
            curDisplay = selectedDisplay;
            if (curDisplay == 'Total'){
                bars
                .data(dd)
                .transition()
                .duration(1000)
                .attr('width', xScale.bandwidth())
                .attr('height', function(d){
                    return (svgheight - yTotal(d[curGroup+'Total']) - padding)
                })
                .attr('x', function(d){
                    return xScale(d.zip);
                })
                .attr('y', function(d){
                    return yTotal(d[curGroup+'Total']);
                });
                yLabel
                    .transition()
                    .duration(1000)
                    .text('Total number of '+curGroup)
                const yTotalAx = d3.axisLeft(yTotal)
                yAx
                    .transition()
                    .duration(1000)
                    .call(yTotalAx)
                    .attr('transform', 'translate(140,0)')
                curMean = d3.mean(dd, d => d[curGroup+'Total'])
                avgLine
                    .transition()
                    .duration(1000)
                    .attr('y1', yTotal(curMean))
                    .attr('y2', yTotal(curMean))
                avgText
                    .transition()
                    .duration(1000)
                    .attr('y', yTotal(curMean))
                    .text('Average: '+Math.round(curMean));
            }
            if (curDisplay == 'Percentage'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yScale(d[curGroup]) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip);
                    })
                    .attr('y', function(d){
                        return yScale(d[curGroup])
                    });
                yLabel
                    .transition()
                    .duration(1000)
                    .text('Rate of '+curGroup)
                yAx
                    .transition()
                    .duration(1000)
                    .call(yAxis)
                    .attr('transform', 'translate(140,0)')
                curMean = d3.mean(dd, d => d[curGroup])
                avgLine
                    .transition()
                    .duration(1000)
                    .attr('y1', yScale(curMean))
                    .attr('y2', yScale(curMean))
                avgText
                    .transition()
                    .duration(1000)
                    .attr('y', yScale(curMean))
                    .text('Average: '+Math.round(curMean * 100)+'%');

            }

        }

        d3.select('#Astigmatism').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Hyperopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Myopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Amblyopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#display').on('change', function(event, d){
            var selectDisplay = d3.select(this).property('value')
            updateDropdown(selectDisplay)
        })
    })
    
}
var question2 = function(filePath){
    var rowConverter = function(d){
        return {
            age: parseInt(d.age),
            allergies: d.allergies,
            Amblyopia: parseInt(d.amblyopia),
            Astigmatism: parseInt(d.astigmatism),
            color: d.color,
            comments: d.comments,
            complaints: d.complaints,
            current_srx: d.current_srx,
            date: d.date,
            date_dt: d.date_dt,
            dbl: parseFloat(d.dbl),
            diagnosis: d.diagnosis,
            dilated: d.dilated,
            dilation_quality_od: d.dilation_quality_od,
            dilation_quality_os: d.dilation_quality_os,
            distance: d.distance,
            distance_od: parseFloat(d.distance_od),
            distance_os: parseFloat(d.distance_os),
            dob: d.dob,
            dob_dt: d.dob_dt,
            dry_od_axis: parseInt(d.dry_od_axis),
            dry_od_cyl: parseFloat(d.dry_od_cyl),
            dry_od_re: parseInt(d.dry_od_re),
            dry_od_sph: parseFloat(d.dry_od_sph),
            dry_os_axis: parseInt(d.dry_os_axis),
            dry_os_cyl: parseFloat(d.dry_os_cyl),
            dry_os_re: parseInt(d.dry_os_re),
            dry_os_sph: parseFloat(d.dry_os_sph),
            dry_ret_od_axis: parseInt(d.dry_ret_od_axis),
            dry_ret_od_cyl: parseFloat(d.dry_ret_od_cyl),
            dry_ret_od_score: parseFloat(d.dry_ret_od_score),
            dry_ret_od_sph: parseFloat(d.dry_ret_od_sph),
            dry_ret_os_axis: parseInt(d.dry_ret_os_axis),
            dry_ret_os_cyl: parseFloat(d.dry_ret_os_cyl),
            dry_ret_os_score: parseFloat(d.dry_ret_os_score),
            dry_ret_os_sph:  parseFloat(d.dry_ret_os_sph),
            emmetropia: parseInt(d.emmetropia),
            family_hx: d.family_hx,
            final_pd_od: parseFloat(d.final_pd_od),
            final_pd_os: parseFloat(d.final_pd_os),
            follow_up: d.follow_up,
            frame: d.frame,
            fundus: d.fundus,
            gestation: d.gestation,
            glasses: d.glasses,
            Hyperopia: parseInt(d.hyperopia),
            matching: d.matching,
            medical_hx: d.medical_hx,
            medications: d.medications,
            Myopia: parseInt(d.myopia),
            near: d.near,
            near_od: parseInt(d.near_od),
            near_os: parseInt(d.near_os),
            normal_bvat_oph: d.normal_bvat_oph,
            ocular_hx: d.ocular_hx,
            optometrist: d.optometrist,
            pd_od: parseFloat(d.pd_od),
            pd_os: parseFloat(d.pd_os),
            school: d.school,
            show: parseInt(d.show),
            size: parseFloat(d.size),
            slit_lamp: d.slit_lamp,
            srx_doctor: d.srx_doctor,
            srx_od_axis: parseFloat(d.srx_od_axis),
            srx_od_cyl: parseFloat(d.srx_od_cyl),
            srx_od_score: parseFloat(d.srx_od_score),
            srx_od_sph: parseFloat(d.srx_od_sph),
            srx_os_axis: parseFloat(d.srx_os_axis),
            srx_os_cyl: parseFloat(d.srx_os_cyl),
            srx_os_score: parseFloat(d.srx_os_score),
            srx_os_sph: parseFloat(d.srx_os_sph),
            student_id: parseInt(d.student_id),
            temple: parseFloat(d.temple),
            terms: d.terms,
            wet_od_axis: parseFloat(d.wet_od_axis),
            wet_od_cyl: parseFloat(d.wet_od_cyl),
            wet_od_re: parseFloat(d.wet_od_re),
            wet_od_sph: parseFloat(d.wet_od_sph),
            wet_os_axis: parseFloat(d.wet_os_axis),
            wet_os_cyl: parseFloat(d.wet_os_cyl),
            wet_os_re: parseFloat(d.wet_os_re),
            wet_os_sph: parseFloat(d.wet_os_sph),
            wet_ret_od_axis: parseFloat(d.wet_ret_od_axis),
            wet_ret_od_cyl: parseFloat(d.wet_ret_od_cyl),
            wet_ret_od_score: parseFloat(d.wet_ret_od_score),
            wet_ret_od_sph: parseFloat(d.wet_ret_od_sph),
            wet_ret_os_axis: parseFloat(d.wet_ret_os_axis),
            wet_ret_os_cyl: parseFloat(d.wet_ret_os_cyl),
            wet_ret_os_score: parseFloat(d.wet_ret_os_score),
            wet_ret_os_sph: parseFloat(d.wet_ret_os_sph),
            year: parseInt(d.year),
            zip_code: parseInt(d.zip_code)
        };
    };
    d3.csv(filePath, rowConverter).then(function(data){
        const width = 1000;
        const height = 1000;
        const padding = 140;
        var curGroup = 'Astigmatism'
        var filtered = data.filter(function(d){ return (d.age == 2) || (d.age == 3) || (d.age == 4) || (d.age == 5)});
        var schools = [...new Set(filtered.map(d => d.school))];
        var ages = [...new Set(filtered.map(d => d.age))];
        ages.sort(d3.ascending)
        var dd = [];
        const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height-padding, padding]);
        ages.forEach(function(d){
            var dataDict = {};
            dataDict['age'] = d;
            var ageFilter = filtered.filter(j => j['age'] == d)

            var avgAstig = d3.mean(ageFilter, l => l.Astigmatism)
            var avgHyper = d3.mean(ageFilter, l => l.Hyperopia)
            var avgMyop = d3.mean(ageFilter, l => l.Myopia)
            var avgAmblyo = d3.mean(ageFilter, l => l.Amblyopia)
            dataDict['Astigmatism'] = avgAstig;
            dataDict['Hyperopia'] = avgHyper;
            dataDict['Myopia'] = avgMyop;
            dataDict['Amblyopia'] = avgAmblyo;
            dd.push(dataDict)
        })
        const svg = d3.select('#q2_plot')
            .append('svg')
                .attr('width', width)
                .attr('height', height)
        const xScale = d3.scaleBand().domain(ages).range([padding, width-padding]).padding(0.2);
        var curMean = d3.mean(dd, d => d[curGroup]);

        
        var tooltip = d3.select('#q2_plot')
            .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .style('background-color', 'white')
                .style('border', 'solid')
                .style('border-width', '2px')
                .style('border-radius', '5px')
                .style('padding', '5px');
        var mouseover = function(d){
            tooltip.style('opacity', 1)
            d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        var mousemove = function(d, e){
            tooltip.html(curGroup+' Rate: '+Math.round(e[curGroup]*100)+'%')
                .style('left', d.pageX-90+'px').style('top', d.pageY-100+'px').style('font-size', 18)
        }
        var mouseleave = function(d){
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }
        svg.append('text')
            .attr('transform', 'translate('+(width/2)+' ,'+(height-90)+')')
            .style('text-anchor', 'middle')
            .text('Age')
        var yLabel = svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 90)
            .attr('x', -(height/2))
            .style('font-size', 18)
            .style('text-anchor', 'middle')
            .text('Rate of '+curGroup)
        var bars2 = svg.selectAll('rect')
            .data(dd)
            .join('rect')
                .attr('x', d => xScale(d.age))
                .attr('width', xScale.bandwidth())
                .attr('fill', '#172A54')
                .attr('height', d => (height - yScale(0) - padding))
                .attr('y', d => yScale(0))
                .style('opacity', 0.8)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseleave', mouseleave)

        bars2
            .transition()
            .duration(1000)
            .attr('y', d => yScale(d.Astigmatism))
            .attr('height', d => (height - yScale(d.Astigmatism) - padding));
        var avgLine = svg.append('line')
            .attr('x1', width/2)
            .attr('x2', width/2)
            .attr('y1', yScale(curMean))
            .attr('y2', yScale(curMean))
            .attr('stroke', 'red')
            .style('stroke-width', 3);
        avgLine
            .transition()
            .duration(2500)
            .attr('x1', padding)
            .attr('x2', width-padding);
        var avgText = svg.append('text')
            .attr('x', width-135)
            .attr('y', yScale(curMean))
            .html('Average: '+Math.round(curMean*100)+'%');
        function update(selectedGroup){
            curGroup = selectedGroup;
            bars2
                .data(dd)
                .transition()
                .duration(1000)
                .attr('width', xScale.bandwidth())
                .attr('height', function(d){
                    return (height - yScale(d[curGroup]) - padding)
                })
                .attr('x', d => xScale(d.age))
                .attr('y', d => yScale(d[curGroup]));
            curMean = d3.mean(dd, d => d[curGroup]);
            yLabel
                .transition()
                .duration(1000)
                .text('Rate of '+curGroup);
            avgLine
                .transition()
                .duration(1000)
                .attr('y1', yScale(curMean))
                .attr('y2', yScale(curMean))
            avgText
                .transition()
                .duration(1000)
                .attr('y', yScale(curMean))
                .text('Average: '+Math.round(curMean*100)+'%')
        }
        svg.append('g')
            .attr('transform', 'translate(0,'+(height-padding)+')')
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('transform', 'translate('+padding+', 0)')
            .call(d3.axisLeft(yScale));

        d3.select('#Astigmatism2').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Hyperopia2').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Myopia2').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Amblyopia2').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })

    })
}
