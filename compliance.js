function compliance(){
    var filePath = 'compliance.csv';
    compReport(filePath)
}
var compReport = function(filePath){
    var rowConverter = function(d){
        return {
            last_name: d.last_name,
            first_name: d.first_name,
            date_exam: d['date seen'],
            school: d.school,
            date_called: d['date called'],
            spoke_with: d['spoke with'],
            compliant: d['wears (y/n)'],
            reason: d['reason'],
            replacement: d['asked for replacement (y/n)'],
            voicemail: d['voicemail (y/n)'],
            unable_to_contact: d['unable to contact '],
            record_id: parseInt(d['Record ID']),
            dob: d['Date of Birth'],
            language: d['Language'],
            gender: d['Gender'],
            ethnicity: d['Ethnicity'],
            school_or_community_event: d['School or Community Event'],
            zip_code: parseInt(d['Zip Code of School or Community Event']),
            name_of_community_event: d['Name of Community Event'],
            date_screened: d['Date Screened'],
            screening_results: d['Screening Results'],
            adult_attending_exam: d['Adult attending Exam?'],
            adult_relationship: d['If Other, please note relationship'],
            gestation: d['Gestation'],
            birth_weight: parseFloat(d['Birth Weight oz']),
            chief_complaint: d['Chief Complaint:'],
            current_srx: d['Current SRx'],
            distance_od: d['Distance: OD '],
            distance_os: d['Distance: OS'],
            near_od: d['Near: OD'],
            near_os: d['Near: OS'],
            dilated: d['Dilated'],
            myopia_od: d['Myopia (choice=OD)'],
            myopia_os: d['Myopia (choice=OS)'],
            hyperopia_od: d['Hyperopia (choice=OD)'],
            hyperopia_os: d['Hyperopia (choice=OS)'],
            astigmatism_od: d['Astigmatism (choice=OD)'],
            astigmatism_os: d['Astigmatism (choice=OS)'],
            amblyo_od: d['Amblyo Strab (choice=OD)'],
            amblyo_os: d['Amblyo Strab (choice=OS)'],
            amblyo_refr_od: d['Amblyo Refr (choice=OD)'],
            general_exam_results: d['General Exam Results'],
            glasses: d['Glasses'],
            for_constant: d['If Yes Glasses, for (choice=Constant)'],
            for_school: d['If Yes Glasses, for (choice=School)'],
            for_near: d['If Yes Glasses, for (choice=Near)'],
            for_distance: d['If Yes Glasses, for (choice=Distance)'],
            for_other: d['If Yes Glasses, for (choice=Other)'],
            frame: d['Frame'],
            size: d['Size'],
            color: d['Color'],
            compliant_2: d['Is Child Complaint?']
        }
    }
    d3.csv(filePath, rowConverter).then(function(data){
        var filtered1 = data.filter(d => ((d.screening_results == 'Refer') || (d.screening_results == 'Refer as Fit for Frame (FFF)')));
        var filtered = filtered1.filter(d => ((d.spoke_with == 'p') || (d.unable_to_contact == 'y')))
        console.log(filtered)
        var comp = filtered.filter(d => d.compliant == 'y')
        var couldNotReach = filtered.filter(d => d.compliant == '')
        var noncomp = filtered.filter(d => d.compliant == 'n')
        var pieData = {'Compliant': comp.length, 'Could not reach': couldNotReach.length, 'Noncompliant': noncomp.length};
        const width = 300;
        const height = 300;
        var radius = 150;
        var svg = d3.select('#pieComp')
            .append('svg')
                .attr('class', 'map')
                .attr('width', width+15)
                .attr('height', height+15)
                .attr('transform', 'translate(50,100)')
            .append('g')
                .attr('transform', `translate(${width/2}, ${height/2})`)
        var svg2 = d3.select('#pieComp')
            .append('svg')
                .attr('class', 'map')
                .attr('width', 200)
                .attr('height', 100)
                .attr('transform', 'translate(40,-100)')
        const color = d3.scaleOrdinal()
            .range(['#1F527B', '#70DBDA', '#473897'])
        var pie = d3.pie()
            .value(function(d){ return d[1]});
        var data_ready = pie(Object.entries(pieData))
        var tooltip = d3.select('#pieComp')
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
            var val = event.data[1]
            tooltip
                .html('<u>'+event.data[0]+'</u>: '+val+' ('+((val/280)*100).toFixed(2)+'%)')
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave = function(d){
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        var pies = svg
            .selectAll('e')
            .data(data_ready)
            .join('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius-10)
            )
            .attr('fill', function(d){
                return color(d.data[0])})
            .style('opacity', 0.8)
            .attr('stroke', 'black')
            .style('stroke-width', 2)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)
        var legend1 = svg2.append('circle')
            .attr('cx', 20)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend2 = svg2.append('circle')
            .attr('cx', 20)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend3 = svg2.append('circle')
            .attr('cx', 20)
            .attr('cy', 80)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var label1 = svg2.append('text')
            .attr('x', 32)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Compliant patients')
        var label2 = svg2.append('text')
            .attr('x', 32)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Could not contact')
        var label3 = svg2.append('text')
            .attr('x', 32)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Noncompliant')
        var onlyPickup = filtered.filter(d => d.spoke_with == 'p')
        var replacementReasons = [...new Set(onlyPickup.map(d => d.replacement))]
        replacementReasons.forEach(function(j){
            var f = onlyPickup.filter(d => d.replacement == j)
        })
        var dd = {'No replacement': 154, 'Broke': 16, 'Reframe': 2, 'Lost': 9, 'Scratched lens': 2}
        var svg3 = d3.select('#pieComp2')
            .append('svg')
                .attr('class', 'map')
                .attr('width', width+15)
                .attr('height', height+15)
                .attr('transform', 'translate(50,50)')
            .append('g')
                .attr('transform', `translate(${width/2}, ${height/2})`)
        var svg4 = d3.select('#pieComp2')
            .append('svg')
                .attr('class', 'map')
                .attr('width', 200)
                .attr('height', 200)
                .attr('transform', 'translate(50,-65)')
        var colorScale = d3.scaleOrdinal()
            .range(['#1F527B', '#70DBDA', '#473897', '#BF8EDD', '#A52D47'])
        var pie2 = d3.pie()
            .value(function(d){ return d[1]});
        var data_ready2 = pie2(Object.entries(dd))
        var tooltip2 = d3.select('#pieComp2')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover2 = function(d){
            tooltip2.style('opacity', 1)
            d3.select(this).style('stroke-width', 6).style('opacity', 1)
        }
        var mousemove2 = function(d, event){
            var val2 = event.data[1]
            tooltip2
                .html('<u>'+event.data[0]+'</u>: '+val2+' ('+((val2/181)*100).toFixed(2)+'%)')
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave2 = function(d){
            tooltip2.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        var pies2 = svg3
            .selectAll('f')
            .data(data_ready2)
            .join('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius-10)
            )
            .attr('fill', function(d){
                return colorScale(d.data[0])
            })
            .style('opacity', 0.8)
            .attr('stroke', 'black')
            .style('stroke-width', 2)
            .on('mouseover', mouseover2)
            .on('mousemove', mousemove2)
            .on('mouseleave', mouseleave2)
        var legend4 = svg4.append('circle')
            .attr('cx', 20)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend5 = svg4.append('circle')
            .attr('cx', 20)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend6 = svg4.append('circle')
            .attr('cx', 20)
            .attr('cy', 80)
            .attr('fill', '#BF8EDD')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend7 = svg4.append('circle')
            .attr('cx', 20)
            .attr('cy', 110)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend8 = svg4.append('circle')
            .attr('cx', 20)
            .attr('cy', 140)
            .attr('fill', '#A52D47')
            .attr('r', 7)
            .style('stroke', 'black')
        var label4 = svg4.append('text')
            .attr('x', 32)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('No replacement')
        var label5 = svg4.append('text')
            .attr('x', 32)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Broken')
        var label6 = svg4.append('text')
            .attr('x', 32)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Lost')
        var label7 = svg4.append('text')
            .attr('x', 32)
            .attr('y', 115)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Reframe')
        var label8 = svg4.append('text')
            .attr('x', 32)
            .attr('y', 145)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('Scratched lens')
        var diffEvents = [...new Set(filtered.map(d => d.school_or_community_event))]
        var dd2 = [];
        diffEvents.forEach(function(d){
            var dataDict = {};
            var filt = filtered.filter(j => j.school_or_community_event == d);
            dataDict['Type of Program'] = d;
            var filt2 = filt.filter(j => j.spoke_with == 'p')
            dataDict['Able to Contact'] = (filt2.length / filt.length)
            var repReasons = [...new Set(filt.map(k => k.replacement))]
            var yesRep = 0
            var noRep = 0
            repReasons.forEach(function(k){
                var cur;
                var f = filt.filter(l => l.replacement == k)
                var repAmount = f.length;
                if (k.length == 0){
                    cur = 'n'
                }
                else {
                    cur = k[0]
                }
                if (cur == 'y'){
                    yesRep += repAmount;
                }
                if (cur == 'n'){
                    noRep += repAmount;
                }
            })
            dataDict['Replacement rate'] = (yesRep / (yesRep + noRep))
            var onlyCompliant = filt2.filter(p => p.compliant == 'y')
            dataDict['Compliance rate'] = (onlyCompliant.length / filt2.length)
            dd2.push(dataDict);
        })
        var width2 = 900;
        var height2 = 600;
        var padding = 125;
        var svg5 = d3.select('#barComp')
            .append('svg')
                .attr('width', width2)
                .attr('height', height2)
                .attr('transform', 'translate(0,100)')
                .attr('class', 'map')
        var subgroups = ['Able to Contact', 'Compliance rate', 'Replacement rate'];
        var groups = dd2.map(d => d['Type of Program'])
        console.log(dd2)
        var xScale = d3.scaleBand().domain(groups).range([padding, width2-padding]).padding([0.2]);
        svg5.append('g')
            .attr('transform', `translate(0, ${height2-padding})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 16)
                .attr('transform', 'translate(0,4)');
        var yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([height2-padding, padding]);
        svg5.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(d3.axisLeft(yScale))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 11);
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, xScale.bandwidth()])
            .padding([0.05])
        var colorScale2 = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#1F527B', '#70DBDA', '#473897']);
        var tooltip3 = d3.select('#barComp')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover3 = function(d){
            tooltip3.style('opacity', 1)
            d3.select(this).style('stroke-width', 2).style('opacity', 1)
        }
        var mousemove3 = function(d, event){
            tooltip3
                .html(`<u>${event.key}</u>: ${((event.value)*100).toFixed(2)}%`)
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave3 = function(d){
            tooltip3.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        svg5.append('g')
            .selectAll('g')
            .data(dd2)
            .join('g')
                .attr('transform', d => `translate(${xScale(d['Type of Program'])}, 0)`)
            .selectAll('rect')
            .data(function(d){ return subgroups.map(function(key){ return {key: key, value: d[key]}; }); })
            .join('rect')
                .attr('x', d => xSubgroup(d.key))
                .attr('y', d => yScale(d.value))
                .attr('width', xSubgroup.bandwidth())
                .attr('height', d => height2-padding - yScale(d.value))
                .attr('fill', d => colorScale2(d.key))
                .style('opacity', 0.8)
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .on('mouseover', mouseover3)
                .on('mousemove', mousemove3)
                .on('mouseleave', mouseleave3)
        var legend9 = svg5.append('circle')
            .attr('cx', 650)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend10 = svg5.append('circle')
            .attr('cx', 650)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend11 = svg5.append('circle')
            .attr('cx', 650)
            .attr('cy', 80)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var label9 = svg5.append('text')
            .attr('x', 662)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% able to contact parent')
        var label10 = svg5.append('text')
            .attr('x', 662)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% compliant')
        var label11 = svg5.append('text')
            .attr('x', 662)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% needing replacement')
        var constantOnly = filtered.filter(d => d.for_constant == 'Checked')
        var nearOrSchool = filtered.filter(d => ((d.for_near == 'Checked') || (d.for_school == 'Checked')))

        var dd3 = [];
        var dataDictConstant = {};
        var dataDictNear = {};
        dataDictConstant['Type of Diagnosis'] = 'constant';
        dataDictNear['Type of Diagnosis'] = 'school/near'
        var constFilter = constantOnly.filter(j => j.spoke_with == 'p');
        var nearFilter = nearOrSchool.filter(j => j.spoke_with == 'p');
        dataDictNear['Able to Contact'] = (nearFilter.length / nearOrSchool.length)
        dataDictConstant['Able to Contact'] = (constFilter.length / constantOnly.length);
        var replacements = [...new Set(constantOnly.map(k => k.replacement))]
        var replacements2 = [...new Set(nearOrSchool.map(k => k.replacement))]
        var yesRepConst = 0;
        var noRepConst = 0;
        var yesRepNear = 0;
        var noRepNear = 0;
        replacements.forEach(function(k){
            var cur;
            var f = constantOnly.filter(l => l.replacement == k)
            var repAmount = f.length;
            if (k.length == 0){
                cur = 'n'
            }
            else {
                cur = k[0]
            }
            if (cur == 'y'){
                yesRepConst += repAmount;
            }
            if (cur == 'n'){
                noRepConst += repAmount
            }
        })
        replacements2.forEach(function(k){
            var cur2;
            var f2 = nearOrSchool.filter(l => l.replacement == k)
            var repAmount2 = f2.length;
            if (k.length == 0){
                cur2 = 'n'
            }
            else {
                cur2 = k[0]
            }
            if (cur2 == 'y'){
                yesRepNear += repAmount2;
            }
            if (cur2 == 'n'){
                noRepNear += repAmount2;
            }
        })
        dataDictConstant['Replacement rate'] = (yesRepConst / (yesRepConst + noRepConst));
        dataDictNear['Replacement rate'] = (yesRepNear / (yesRepNear + noRepNear));
        var onlyComp = constFilter.filter(p => p.compliant == 'y');
        var onlyComp2 = nearFilter.filter(p => p.compliant == 'y');
        dataDictConstant['Compliance rate'] = (onlyComp.length / constFilter.length);
        dataDictNear['Compliance rate'] = (onlyComp2.length / nearFilter.length);
        dataDictConstant['Compliance Total'] = constFilter.length
        dataDictNear['Compliance Total'] = nearFilter.length;
        dataDictConstant['Replacement Total'] = (yesRepConst + noRepConst)
        dataDictNear['Replacement Total'] = (yesRepNear + noRepNear);
        dataDictConstant['Contact Total'] = constantOnly.length;
        dataDictNear['Contact Total'] = nearOrSchool.length;
        dd3.push(dataDictConstant);
        dd3.push(dataDictNear);
        console.log(dd3)
        var width3 = 900;
        var height3 = 600;
        var svg6 = d3.select('#barComp2')
            .append('svg')
                .attr('width', width3)
                .attr('height', height3)
                .attr('transform', 'translate(0,100)')
                .attr('class', 'map')
        var subgroups2 = ['Able to Contact', 'Compliance rate', 'Replacement rate'];
        var groups2 = dd3.map(d => d['Type of Diagnosis'])
        var xScale2 = d3.scaleBand().domain(groups2).range([padding, width3-padding]).padding([0.2]);
        svg6.append('g')
            .attr('transform', `translate(0, ${height3-padding})`)
            .call(d3.axisBottom(xScale2).tickSize(0))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 16)
                .attr('transform', 'translate(0,4)');
        var yScale2 = d3.scaleLinear()
            .domain([0, 1])
            .range([height3-padding, padding]);
        svg6.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(d3.axisLeft(yScale2))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 11)
        var xSubGroup2 = d3.scaleBand()
            .domain(subgroups2)
            .range([0, xScale2.bandwidth()])
            .padding([0.05])
        var colorScale3 = d3.scaleOrdinal()
            .domain(subgroups2)
            .range(['#1F527B', '#70DBDA', '#473897'])
        var tooltip4 = d3.select('#barComp2')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover4 = function(d){
            tooltip4.style('opacity', 1)
            d3.select(this).style('stroke-width', 2).style('opacity', 1)
        }
        var mousemove4 = function(d, event){
            tooltip4
                .html(`<u>${event.key}</u>: ${((event.value)*100).toFixed(2)}%`)
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave4 = function(d){
            tooltip4.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        svg6.append('g')
            .selectAll('g')
            .data(dd3)
            .join('g')
                .attr('transform', d => `translate(${xScale2(d['Type of Diagnosis'])}, 0)`)
            .selectAll('rect')
            .data(function(d){ return subgroups2.map(function(key){ return {key: key, value: d[key]}; }); })
            .join('rect')
                .attr('x', d => xSubGroup2(d.key))
                .attr('y', d => yScale2(d.value))
                .attr('width', xSubGroup2.bandwidth())
                .attr('height', d => height3-padding - yScale2(d.value))
                .attr('fill', d => colorScale3(d.key))
                .style('opacity', 0.8)
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .on('mouseover', mouseover4)
                .on('mousemove', mousemove4)
                .on('mouseleave', mouseleave4)
        var legend12 = svg6.append('circle')
            .attr('cx', 650)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend13 = svg6.append('circle')
            .attr('cx', 650)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend14 = svg6.append('circle')
            .attr('cx', 650)
            .attr('cy', 80)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var label12 = svg6.append('text')
            .attr('x', 662)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% able to contact parent')
        var label13 = svg6.append('text')
            .attr('x', 662)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% compliant')
        var label14 = svg6.append('text')
            .attr('x', 662)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% needing replacement')
        var onlyMale = filtered.filter(k => k.gender == 'Male')
        var onlyFemale = filtered.filter(k => k.gender == 'Female')
        var dd4 = [];
        var ddMale = {};
        var ddFemale = {};
        ddMale['Gender'] = 'male';
        ddFemale['Gender'] = 'female';
        var maleContact = onlyMale.filter(j => j.spoke_with == 'p');
        var femaleContact = onlyFemale.filter(j => j.spoke_with == 'p');
        ddMale['Able to Contact'] = (maleContact.length / onlyMale.length);
        ddFemale['Able to Contact'] = (femaleContact.length / onlyFemale.length);
        var rep = [...new Set(onlyMale.map(k => k.replacement))]
        var rep2 = [...new Set(onlyFemale.map(k => k.replacement))]
        var yesRepMale = 0;
        var noRepMale = 0;
        var yesRepFemale = 0;
        var noRepFemale = 0;
        rep.forEach(function(k){
            var cur;
            var f = onlyMale.filter(l => l.replacement == k)
            var repAmount3 = f.length;
            if (k.length == 0){
                cur = 'n'
            }
            else {
                cur = k[0]
            }
            if (cur == 'y'){
                yesRepMale += repAmount3;
            }
            if (cur == 'n'){
                noRepMale += repAmount3;
            }
        })
        rep2.forEach(function(k){
            var cur2;
            var f2 = onlyFemale.filter(l => l.replacement == k)
            var repAmount3 = f2.length;
            if (k.length == 0){
                cur2 = 'n'
            }
            else {
                cur2 = k[0]
            }
            if (cur2 == 'y'){
                yesRepFemale += repAmount3;
            }
            if (cur2 == 'n'){
                noRepFemale += repAmount3;
            }
        })
        ddMale['Replacement rate'] = (yesRepMale / (yesRepMale + noRepMale));
        ddFemale['Replacement rate'] = (yesRepFemale / (yesRepFemale + noRepFemale));
        var onlyCompMale = maleContact.filter(p => p.compliant == 'y');
        var onlyCompFemale = femaleContact.filter(p => p.compliant == 'y');
        ddMale['Compliance rate'] = (onlyCompMale.length / maleContact.length);
        ddFemale['Compliance rate'] = (onlyCompFemale.length / femaleContact.length);
        ddMale['Compliance Total'] = maleContact.length;
        ddFemale['Compliance Total'] = femaleContact.length;
        ddMale['Replacement Total'] = maleContact.length;
        ddFemale['Replacement Total'] = femaleContact.length;
        ddMale['Contact Total'] = onlyMale.length;
        ddFemale['Contact Total'] = onlyFemale.length;
        dd4.push(ddMale);
        dd4.push(ddFemale);
        var width4 = 900;
        var height4 = 600;
        var svg7 = d3.select('#barComp3')
            .append('svg')
                .attr('width', width4)
                .attr('height', height4)
                .attr('transform', 'translate(0,100)')
                .attr('class', 'map')
        var subgroups3 = ['Able to Contact', 'Compliance rate', 'Replacement rate'];
        var groups3 = dd4.map(d => d['Gender'])
        var xScale3 = d3.scaleBand().domain(groups3).range([padding, width4-padding]).padding([0.2]);
        svg7.append('g')
            .attr('transform', `translate(0, ${height4-padding})`)
            .call(d3.axisBottom(xScale3).tickSize(0))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 16)
                .attr('transform', 'translate(0,4)');
        var yScale3 = d3.scaleLinear()
            .domain([0, 1])
            .range([height4-padding, padding]);
        svg7.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(d3.axisLeft(yScale3))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 11)
        var xSubGroup3 = d3.scaleBand()
            .domain(subgroups3)
            .range([0, xScale3.bandwidth()])
            .padding([0.05])
        var colorScale4 = d3.scaleOrdinal()
            .domain(subgroups3)
            .range(['#1F527B', '#70DBDA', '#473897'])
        var tooltip5 = d3.select('#barComp3')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover5 = function(d){
            tooltip5.style('opacity', 1)
            d3.select(this).style('stroke-width', 2).style('opacity', 1)
        }
        var mousemove5 = function(d, event){
            tooltip5
                .html(`<u>${event.key}</u>: ${((event.value)*100).toFixed(2)}%`)
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave5 = function(d){
            tooltip5.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        svg7.append('g')
            .selectAll('g')
            .data(dd4)
            .join('g')
                .attr('transform', d => `translate(${xScale3(d['Gender'])}, 0)`)
            .selectAll('rect')
            .data(function(d){ return subgroups3.map(function(key){ return {key: key, value: d[key]}; }); })
            .join('rect')
                .attr('x', d => xSubGroup3(d.key))
                .attr('y', d => yScale3(d.value))
                .attr('width', xSubGroup3.bandwidth())
                .attr('height', d => height4-padding-yScale3(d.value))
                .attr('fill', d => colorScale4(d.key))
                .style('opacity', 0.8)
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .on('mouseover', mouseover5)
                .on('mousemove', mousemove5)
                .on('mouseleave', mouseleave5)
        var legend15 = svg7.append('circle')
            .attr('cx', 650)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend16 = svg7.append('circle')
            .attr('cx', 650)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend17 = svg7.append('circle')
            .attr('cx', 650)
            .attr('cy', 80)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var label15 = svg7.append('text')
            .attr('x', 662)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% able to contact parent')
        var label16 = svg7.append('text')
            .attr('x', 662)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% compliant')
        var label17 = svg7.append('text')
            .attr('x', 662)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% needing replacement')
        filtered.forEach(function(p){
            if ((p['first_name'] == 'jayden') && (p['last_name'] == 'millian')){
                p['date_called'] = '7/7/22'
            }
            if ((p['first_name'] == 'hawke') && (p['last_name'] == 'rivers')){
                p['date_exam'] = '10/6/21'
            }
            if ((p['first_name'] == 'estevan') && (p['last_name'] == 'carreon')){
                p['date_exam'] = '10/6/21'
            }
            if ((p['first_name'] == 'liam') && (p['last_name'] == 'sandoval')){
                p['date_called'] = '7/7/22'
            }
            var examDate = Date.parse(p['date_exam'])
            var callDate = Date.parse(p['date_called'])
            p['diff_dates'] = parseInt((callDate - examDate) * 0.000000011574)
        })
        var timeGroup1 = filtered.filter(j => ((j['diff_dates'] > 30) && (j['diff_dates'] <= 60)));
        var timeGroup2 = filtered.filter(j => ((j['diff_dates'] > 60) && (j['diff_dates'] <= 90)));
        var timeGroup3 = filtered.filter(j => ((j['diff_dates'] > 90) && (j['diff_dates'] <= 120)));
        var timeGroup4 = filtered.filter(j => ((j['diff_dates'] > 120)))
        console.log(d3.extent(filtered, j => j['diff_dates']))
        console.log(filtered.length)
        console.log(timeGroup4)
        var diffGroups = [timeGroup1, timeGroup2, timeGroup3, timeGroup4];
        var dd5 = [];
        diffGroups.forEach(function(j){
            var dataDict = {};
            dataDict['Time Group'] = j[0]['diff_dates'];
            var onlyReached = j.filter(d => d.spoke_with == 'p');
            dataDict['Able to Contact'] = (onlyReached.length / j.length)
            dataDict['Contact total'] = j.length;
            var repReasons = [...new Set(j.map(k => k.replacement))]
            var yesRep = 0;
            var noRep = 0;
            repReasons.forEach(function(k){
                var cur;
                var f = onlyReached.filter(l => l.replacement == k)
                var repAmount = f.length;
                if (k.length == 0){
                    cur = 'n';
                }
                else {
                    cur = k[0]
                }
                if (cur == 'y'){
                    yesRep += repAmount;
                }
                if (cur == 'n'){
                    noRep += repAmount;
                }
            })
            dataDict['Replacement rate'] = (yesRep / (yesRep + noRep))
            dataDict['Replacement total'] = (yesRep + noRep)
            var compliantFilt = onlyReached.filter(p => p.compliant == 'y')
            dataDict['Compliance rate'] = (compliantFilt.length / onlyReached.length);
            dataDict['Compliance total'] = onlyReached.length;
            dd5.push(dataDict)
        })
        console.log(dd5)
        var width5 = 900;
        var height5 = 600;
        var svg8 = d3.select('#barComp4')
            .append('svg')
                .attr('width', width5)
                .attr('height', height5)
                .attr('transform', 'translate(0,-100)')
                .attr('class', 'map')
        var subgroups4 = ['Able to Contact', 'Compliance rate', 'Replacement rate'];
        var groups4 = ['30-60 days', '60-90 days', '90-120 days', '120+ days'];
        var xScale4 = d3.scaleBand().domain(groups4).range([padding, width5-padding]).padding([0.2]);
        svg8.append('g')
            .attr('transform', `translate(0, ${height5-padding})`)
            .call(d3.axisBottom(xScale4).tickSize(0))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 16)
                .attr('transform', 'translate(0,4)');
        var yScale4 = d3.scaleLinear()
            .domain([0, 1])
            .range([height5-padding, padding]);
        svg8.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(d3.axisLeft(yScale4))
            .selectAll('text')
                .attr('class', 'yearEndFont')
                .style('font-size', 11);
        var xSubGroup4 = d3.scaleBand()
            .domain(subgroups4)
            .range([0, xScale4.bandwidth()])
            .padding([0.05])
        var colorScale5 = d3.scaleOrdinal()
            .domain(subgroups4)
            .range(['#1F527B', '#70DBDA', '#473897']);
        var tooltip6 = d3.select('#barComp4')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('border', 'solid')
            .style('border-width', '2px')
            .style('border-radius', '5px')
            .style('padding', '5px')
        var mouseover6 = function(d){
            tooltip6.style('opacity', 1)
            d3.select(this).style('stroke-width', 2).style('opacity', 1)
        }
        var mousemove6 = function(d, event){
            tooltip6
                .html(`<u>${event.key}</u>: ${((event.value)*100).toFixed(2)}%`)
                .style('left', d.pageX+10).style('top', d.pageY-35)
        }
        var mouseleave6 = function(d){
            tooltip6.style('opacity', 0)
            d3.select(this).style('stroke-width', 1).style('opacity', 0.8)
        }
        svg8.append('g')
            .selectAll('g')
            .data(dd5)
            .join('g')
                .attr('transform', function(d){
                    if (d['Time Group'] == 47){
                        return `translate(${xScale4('30-60 days')}, 0)`
                    }
                    if (d['Time Group'] == 81){
                        return `translate(${xScale4('60-90 days')}, 0)`
                    }
                    if (d['Time Group'] == 98){
                        return `translate(${xScale4('90-120 days')}, 0)`
                    }
                    if (d['Time Group'] == 219){
                        return `translate(${xScale4('120+ days')}, 0)`
                    }
                })
            .selectAll('rect')
            .data(function(d){ return subgroups4.map(function(key){ return {key: key, value: d[key]}; }); })
            .join('rect')
                .attr('x', d => xSubGroup4(d.key))
                .attr('y', d => yScale4(d.value))
                .attr('width', xSubGroup4.bandwidth())
                .attr('height', d => height5-padding - yScale4(d.value))
                .attr('fill', d => colorScale5(d.key))
                .style('opacity', 0.8)
                .style('stroke', 'black')
                .style('stroke-width', 1)
                .on('mouseover', mouseover6)
                .on('mousemove', mousemove6)
                .on('mouseleave', mouseleave6)
        var legend18 = svg8.append('circle')
            .attr('cx', 650)
            .attr('cy', 20)
            .attr('fill', '#1F527B')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend19 = svg8.append('circle')
            .attr('cx', 650)
            .attr('cy', 50)
            .attr('fill', '#70DBDA')
            .attr('r', 7)
            .style('stroke', 'black')
        var legend20 = svg8.append('circle')
            .attr('cx', 650)
            .attr('cy', 80)
            .attr('fill', '#473897')
            .attr('r', 7)
            .style('stroke', 'black')
        var label18 = svg8.append('text')
            .attr('x', 662)
            .attr('y', 25)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% able to contact parent')
        var label19 = svg8.append('text')
            .attr('x', 662)
            .attr('y', 55)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% compliant')
        var label20 = svg8.append('text')
            .attr('x', 662)
            .attr('y', 85)
            .attr('class', 'yearEndFont')
            .style('font-size', 20)
            .text('% needing replacement')
        console.log(filtered)
    })
}
