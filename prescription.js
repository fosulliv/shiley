function prescrip(){
    var filePath="exam.csv";
    question3(filePath);
}

var question3=function(filePath){
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
        var filtered = data.filter(d => d['show'] == 1);
        var onlyShow = filtered.filter(d => d['glasses'] == 'yes' || d['glasses'] == 'no')
        var glasses = [...new Set(onlyShow.map(d => d.glasses))];
        onlyShow.forEach(function(d){
            if (d.glasses == 'yes'){
                d['glasses_code'] = 1
            }
            if (d.glasses == 'no'){
                d['glasses_code'] = 0
            }
        })
        const height = 900;
        const width = 900;
        const padding = 100;
        var filtered = onlyShow.filter(function(d){ return (d.age == 2) || (d.age == 3) || (d.age == 4) || (d.age == 5)});
        var curX = 'age';
        var ages = [...new Set(filtered.map(d => d.age))];
        var zips = [...new Set(filtered.map(d => d.zip_code))]
        ages.sort(d3.ascending);
        var diags = ['Astigmatism', 'Hyperopia', 'Myopia', 'Amblyopia'];
        var ddAge = [];
        ages.forEach(function(d){
            var dataDict = {};
            dataDict['group'] = d;
            var ageFilter = filtered.filter(j => j['age'] == d)
            var avgGlasses = d3.mean(ageFilter, l => l.glasses_code);
            dataDict['value'] = avgGlasses;
            ddAge.push(dataDict);
        })
        var ddZip = [];
        zips.forEach(function(d){
            var dataDict = {};
            dataDict['group'] = d;
            var zipFilter = filtered.filter(j => j['zip_code'] == d)
            var avgGlasses = d3.mean(zipFilter, l => l.glasses_code)
            dataDict['value'] = avgGlasses;
            ddZip.push(dataDict);
        })

        var ddDiag = [];
        diags.forEach(function(d){
            var dataDict = {};
            dataDict['group'] = d;
            var diagFilter = filtered.filter(j => j[d] == 1);
            var avgGlasses = d3.mean(diagFilter, l => l.glasses_code)
            dataDict['value'] = avgGlasses;
            ddDiag.push(dataDict)
        })
        var glassesMean = d3.mean(filtered, d => d.glasses_code);


        const svg = d3.select('#prescrip_plot')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        var xScale = d3.scaleBand().range([padding, width-padding]).padding(0.2);
        var xAxis = svg.append('g').attr('transform', 'translate(0,'+(height-padding)+')')

        var yScale = d3.scaleLinear().range([height-padding, padding]).domain([0,1]);
        var yAxis = svg.append('g').attr('class', 'myYaxis');

        var avgText = svg.append('text')
            .attr('x', width-100)
            .attr('y', yScale(glassesMean))
            .html('Average: '+Math.round(glassesMean*100)+'%');

        function update(data){
            xScale.domain(data.map(d => d.group))
            xAxis.transition().duration(1000).call(d3.axisBottom(xScale))
                .selectAll('text')
                .attr('transform', 'rotate(325)')
                .style('text-anchor', 'end')
                .style('font-size', 9)
            yAxis.transition().duration(1000).call(d3.axisLeft(yScale)).attr('transform', 'translate('+padding+',0)')
            var u = svg.selectAll('rect')
                .data(data)
            u
                .join('rect')
                .transition()
                .duration(1000)
                    .attr('x', d => xScale(d.group))
                    .attr('y', d => yScale(d.value))
                    .attr('width', xScale.bandwidth())
                    .attr('height', d => (height - yScale(d.value) - padding))
                    .attr('fill', '#172A54')
        }
        update(ddAge);
        
        var avgLine = svg.append('line')
            .attr('x1', width/2)
            .attr('x2', width/2)
            .attr('y1', yScale(glassesMean))
            .attr('y2', yScale(glassesMean))
            .attr('stroke', 'red')
            .style('stroke-width', 3);
        avgLine
            .transition()
            .duration(3000)
            .attr('x1', padding)
            .attr('x2', width-padding-15);

        d3.select('#agePrescrip')
            .on('change', function(event, d){
                update(ddAge)
            })
        d3.select('#zipPrescrip')
            .on('change', function(event, d){
                update(ddZip)
            })
        d3.select('#diagPrescrip')
            .on('change', function(event, d){
                update(ddDiag)
            })

        
    })
}