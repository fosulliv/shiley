function drawMap(){
    var fileMap = 'US_ZC_91901.geojson';
    var filePath = 'screen.csv';
    var filePath2 = 'exam.csv'
    var zipPath = 'zips_data.csv';
    question4(filePath, filePath2, fileMap, zipPath)
}

var question4=function(filePath, filePath2, fileMap, zipPath){
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
        var rowConverter2 = function(d){
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
        d3.csv(filePath2, rowConverter2).then(function(exams){
            exams.forEach(function(d){
                if (d.glasses == 'yes'){
                    d['glasses_code'] = 1
                }
                if (d.glasses == 'no'){
                    d['glasses_code'] = 0
                }
            })
            var zips = [...new Set(data.map(d => d.zip_code))];
            var dd = []
            var curGroup = 'totalSchools';
            zips.forEach(function(d){
                var dataDict = {};
                dataDict['zip'] = d
                var filtered = data.filter(j => j.zip_code == d)
                var schools = [...new Set(filtered.map(j => j.school))];
                var refFilter = filtered.filter(l => l.result == 'refer');
                dataDict['total_screened'] = filtered.length;
                dataDict['totalSchools'] = schools.length;
                var refRate = Math.round((refFilter.length / filtered.length)*100);
                dataDict['refRate'] = refRate;
                var examFilter = exams.filter(j => j.zip_code == d)
                var showRate = Math.round(d3.mean(examFilter, l => l.show)*100);
                var glassesRate = Math.round(d3.mean(examFilter, l => l.glasses_code)*100);
                var astigRate = Math.round(d3.mean(examFilter, l => l.Astigmatism)*100);
                if (isNaN(astigRate)){
                    astigRate = 0;
                }
                var myopRate = Math.round(d3.mean(examFilter, l => l.Myopia)*100);
                if (isNaN(myopRate)){
                    myopRate = 0;
                }
                var hypRate = Math.round(d3.mean(examFilter, l => l.Hyperopia)*100);
                if (isNaN(hypRate)){
                    hypRate = 0;
                }
                var ambRate = Math.round(d3.mean(examFilter, l => l.Amblyopia)*100);
                if (isNaN(ambRate)){
                    ambRate = 0;
                }
                if (isNaN(showRate)){
                    showRate = 0;
                }
                if (isNaN(glassesRate)){
                    glassesRate = 0;
                }
                dataDict['astigRate'] = astigRate;
                dataDict['myopRate'] = myopRate;
                dataDict['hypRate'] = hypRate;
                dataDict['ambRate'] = ambRate;
                dataDict['showRate'] = showRate;
                dataDict['glassesRate'] = glassesRate;
                dd.push(dataDict);
            })
            var colorScale = d3.scaleSequential().domain([0, d3.max(dd, d => d[curGroup])]).range(['#EAF7FF', '#003559']);
            const zipmap = d3.json(fileMap);
            var tooltip = d3.select('#geomap')
                .append('div')
                    .style('opacity', 0)
                    .style('left', '600px')
                    .style('top', '1700')
                    .attr('class', 'tooltip')
                    .style('background-color', 'white')
                    .style('border', 'solid')
                    .style('border-width', '2px')
                    .style('border-radius', '5px')
                    .style('padding', '5px')
            var mouseover = function(d){
                tooltip.style('opacity', 1)
                d3.select(this).style('stroke', 'red').style('stroke-width', 2)
            }
            var mousemoveBefore = '# preschools visited by EM: '
            var mousemoveAfter = ''
            var mousemove = function(d, event){
                var zipName = event.properties.ZDC_ID;
                var zipInt = parseInt(zipName);
                var val = 0;
                if (zips.includes(zipInt)){
                    var onlyZip = dd.filter(k => k.zip == zipInt)[0];
                    val = onlyZip[curGroup]
                }
                tooltip.html('Zip: '+zipName+'<br>'+`${mousemoveBefore}`+val+`${mousemoveAfter}`)
                    .style('left', d.pageX-50).style('top', d.pageY-75)
            }
            var mouseleave = function(d){
                tooltip.style('opacity', 0)
                d3.select(this).style('stroke', 'black').style('stroke-width', 1)
            }
            zipmap.then(function(map){
                var feats = map.features;
                var allZips = [];
                feats.forEach(function(q){
                    allZips.push(parseInt(q.properties.ZDC_ID))
                })
                var rowConverter3 = function(d){
                    return {
                        bachelors_prop: parseFloat(d.ped3_13_17),
                        income_less_than_15k: parseFloat(d.pin1b_13_17),
                        income_between_15_30: parseFloat(d.pin2b_13_17),
                        income_between_30_50: parseFloat(d.pin3b_13_17),
                        income_between_50_100: parseFloat(d.pin3b_13_17),
                        income_greater_than_100: parseFloat(d.pin3b_13_17),
                        prop_never_married: parseFloat(d.pnvmar13_17),
                        age_under_18: parseFloat(d.p18yr_13_17),
                        age_between_18_29: parseFloat(d.p18_2913_17),
                        age_between_30_39: parseFloat(d.p30_3913_17),
                        age_between_40_49: parseFloat(d.p40_4913_17),
                        age_between_50_69: parseFloat(d.p50_6913_17),
                        age_above_70: parseFloat(d.pge7013_17),
                        unemployment_rate: parseFloat(d.punemp13_17),
                        professional_employment_rate: parseFloat(d.pprof13_17),
                        income_12months_below_poverty: parseFloat(d.ppov13_17),
                        public_assistance_income: parseFloat(d.ppubas13_17),
                        female_headed_families_with_kids: parseFloat(d.pfhfam13_17),
                        owner_occupied_house: parseFloat(d.pownoc13_17),
                        land_area: parseFloat(d.aland10),
                        total_population: parseFloat(d.totpop_13_17),
                        population_density: parseFloat(d.popden_13_17),
                        prop_hispanic: parseFloat(d.phispanic13_17),
                        prop_white: parseFloat(d.pnhwhite13_17),
                        prop_black: parseFloat(d.pnhblack13_17),
                        prop_foreign: parseFloat(d.pfborn13_17),
                        less_than_high_school_diploma: parseFloat(d.ped1_13_17),
                        high_school_diploma_some_college: parseFloat(d.ped2_13_17),
                        zip: parseInt(d.zcta10)
                    }
                }
                d3.csv(zipPath, rowConverter3).then(function(zipData){
                    var zData = [];
                    allZips.forEach(function(j){
                        var onlyZ = zipData.filter(d => d.zip == j)
                        if (onlyZ.length != 0){
                            zData.push(onlyZ[0])
                        }
                    })
                    var ddScatter = [];
                    zips.forEach(function(z){
                        var dataDict2 = {}
                        var firstFilt = dd.filter(d => d.zip == z)[0]
                        dataDict2['ambRate'] = firstFilt.ambRate;
                        dataDict2['astigRate'] = firstFilt.astigRate;
                        dataDict2['glassesRate'] = firstFilt.glassesRate;
                        dataDict2['hypRate'] = firstFilt.hypRate;
                        dataDict2['myopRate'] = firstFilt.myopRate;
                        dataDict2['refRate'] = firstFilt.refRate;
                        dataDict2['showRate'] = firstFilt.showRate;
                        dataDict2['totalSchools'] = firstFilt.totalSchools;
                        dataDict2['total_screened'] = firstFilt.total_screened;
                        var secondFilt = zData.filter(d => d.zip == z)[0];
                        dataDict2['bachelors_prop'] = secondFilt.bachelors_prop * 100;
                        dataDict2['high_school_diploma_some_college'] = secondFilt.high_school_diploma_some_college*100;
                        dataDict2['income_12months_below_poverty'] = secondFilt.income_12months_below_poverty*100;
                        dataDict2['income_between_15_30'] = secondFilt.income_between_15_30*100;
                        dataDict2['income_between_30_50'] = secondFilt.income_between_30_50*100;
                        dataDict2['income_between_50_100'] = secondFilt.income_between_50_100*100;
                        dataDict2['income_greater_than_100'] = secondFilt.income_greater_than_100*100;
                        dataDict2['income_less_than_15k'] = secondFilt.income_less_than_15k*100;
                        dataDict2['less_than_high_school_diploma'] = secondFilt.less_than_high_school_diploma*100;
                        dataDict2['owner_occupied_house'] = secondFilt.owner_occupied_house*100;
                        dataDict2['professional_employment_rate'] = secondFilt.professional_employment_rate*100;
                        dataDict2['prop_black'] = secondFilt.prop_black*100;
                        dataDict2['prop_foreign'] = secondFilt.prop_foreign*100;
                        dataDict2['prop_hispanic'] = secondFilt.prop_hispanic*100;
                        dataDict2['prop_white'] = secondFilt.prop_white*100;
                        dataDict2['public_assistance_income'] = secondFilt.public_assistance_income*100;
                        dataDict2['unemployment_rate'] = secondFilt.unemployment_rate*100;
                        ddScatter.push(dataDict2)
                    })
                    console.log(ddScatter)
                    var width = 800;
                    var height = 800;
                    var projection = d3.geoAlbersUsa().fitSize([width, height], map);
                    var geoGenerator = d3.geoPath().projection(projection);
                    var svg = d3.select('#geomap')
                        .append('svg').attr('width', width).attr('height', height)
                        .attr('class', 'map');
                    var defs = svg.append('defs')
                    var grad = defs.append('linearGradient')
                    .attr('id', 'grad1')
                    .attr('x1', '0%')
                    .attr('y1', '0%')
                    .attr('x2', '0%')
                    .attr('y2', '100%');
                    grad.append('stop')
                        .attr('offset', '0%')
                        .style('stop-color', '#EAF7FF')
                        .style('stop-opacity', 1);
                    grad.append('stop')
                        .attr('offset', '100%')
                        .style('stop-color', '#003559')
                        .style('stop-opacity', 1);
                    var mapPath = svg.append('g').selectAll('path').data(feats).join('path').attr('d', geoGenerator).attr('stroke', 'black').attr('stroke-width', 1)
                        .attr('fill', function(d){
                            var z = parseInt(d.properties.ZDC_ID)
                            if (zips.includes(z)){
                                var f = dd.filter(l => l.zip == z)[0]
                                return colorScale(f[curGroup])
                            }
                            else {
                                return 'white'
                            }
                        })
                        .on('mouseover', mouseover)
                        .on('mousemove', mousemove)
                        .on('mouseleave', mouseleave);
                    var title = svg.append('text')
                        .attr('x', 800)
                        .attr('y', 15)
                        .style('text-anchor', 'end')
                        .style('font-size', 16)
                        .text('Number of preschools visited by the EyeMobile')
                    svg.append('rect')
                        .attr('height', 150)
                        .attr('width', 20)
                        .attr('x', 3)
                        .attr('y', 300)
                        .style('stroke', 'black')
                        .style('stroke-width', 1)
                        .attr('class', 'legendRect')
                        .attr('fill', 'url(#grad1)')
                    var legend1 = svg.append('text')
                        .attr('x', 28)
                        .attr('y', 312)
                        .text(colorScale.domain()[0])
                    var legend2 = svg.append('text')
                        .attr('x', 28)
                        .attr('y', 448)
                        .text(colorScale.domain()[1])
                    function updateDropdown(grp){
                        if (grp == 'totalSchools'){
                            curGroup = 'totalSchools'
                            globalGroup1 = 'totalSchools'
                            mousemoveBefore = '# preschools visited by EM: '
                            mousemoveAfter = ''
                            var cScale = d3.scaleSequential().domain([0, d3.max(dd, d => d['totalSchools'])]).range(['#EAF7FF', '#003559'])
                            mapPath
                                .data(feats)
                                .transition()
                                .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0])
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1])
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Number of preschools visited by the EyeMobile')
                            }
                            if (grp == 'refRate'){
                                curGroup = 'refRate'
                                globalGroup1 = 'refRate'
                                mousemoveBefore = 'Referral rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain([0, d3.max(dd, d => d.refRate)]).range(['#EAF7FF', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Referral rate per zip code')
                            }
                            if (grp == 'showRate'){
                                curGroup = 'showRate'
                                globalGroup1 = 'showRate'
                                mousemoveBefore = 'Completion rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain([0, d3.max(dd, d => d.showRate)]).range(['#EAF7FF', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Exam completion rate after being referred')
                            }
                            if (grp == 'glassesRate'){
                                curGroup = 'glassesRate'
                                globalGroup1 = 'glassesRate'
                                mousemoveBefore = 'Prescription rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain(d3.extent(dd, d => d.glassesRate)).range(['white', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Prescription rate from examinations')
                            }
                            if (grp == 'astigRate'){
                                curGroup = 'astigRate'
                                globalGroup1 = 'astigRate'
                                mousemoveBefore = 'Astigmatism rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain(d3.extent(dd, d => d.astigRate)).range(['white', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Astigmatism rate')
                            }
                            if (grp == 'hypRate'){
                                curGroup = 'hypRate'
                                globalGroup1 = 'hypRate'
                                mousemoveBefore = 'Hyperopia rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain(d3.extent(dd, d => d.hypRate)).range(['white', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Hyperopia rate')
                            }
                            if (grp == 'myopRate'){
                                curGroup = 'myopRate'
                                globalGroup1 = 'myopRate'
                                mousemoveBefore = 'Myopia rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain(d3.extent(dd, d => d.myopRate)).range(['white', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Myopia rate')
                            }
                            if (grp == 'ambRate'){
                                curGroup = 'ambRate'
                                globalGroup1 = 'ambRate'
                                mousemoveBefore = 'Amblyopia rate: '
                                mousemoveAfter = '%'
                                var cScale = d3.scaleSequential().domain(d3.extent(dd, d => d.ambRate)).range(['white', '#003559'])
                                mapPath
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zips.includes(z)){
                                            var f = dd.filter(l => l.zip == z)[0]
                                            return cScale(f[curGroup])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                legend1
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[0]+'%')
                                legend2
                                    .transition()
                                    .duration(1000)
                                    .text(cScale.domain()[1]+'%')
                                title
                                    .transition()
                                    .duration(1000)
                                    .text('Amblyopia rate')
                                }                
                            }
                    var isComparison = false;
                    d3.select('#addComparison').on('click', function(ch){
                        var newWidth = window.innerWidth
                        height = 800;
                        console.log(ch)
                        if (!isComparison){
                            svg
                                .transition()
                                .duration(1000)
                                .attr('width', (newWidth/2)-10)
                                .attr('height', height)
                            projection
                                .fitSize([(newWidth/2)-10, height], map)
                            geoGenerator
                                .projection(projection)
                            mapPath
                                .attr('d', geoGenerator)
                            title
                                .transition()
                                .duration(1000)
                            console.log(globalGroup1)
                            d3.select('#geomap')
                                .transition()
                                .duration(1000)
                                .attr('class', 'left_plot')
                            var curGroup2 = 'income_less_than_15k'
                            var zipsInZData = [...new Set(zData.map(d => d.zip))];
                            var projection2 = d3.geoAlbersUsa().fitSize([newWidth/2, height], map);
                            var geoGenerator2 = d3.geoPath().projection(projection2);
                            var cScale2 = d3.scaleSequential().domain(d3.extent(zData, j => j.income_less_than_15k)).range(['#EAF7FF', '#003559']);
                            var svg2 = d3.select('#compPath').append('svg').attr('class', 'map').attr('width', (newWidth/2)-10).attr('height', height).attr('transform', 'translate('+(newWidth/2)+','+-height+')')
                            var tooltip2 = d3.select('#compPath')
                                .append('div')
                                    .style('opacity', 0)
                                    .style('left', '600px')
                                    .style('top', '1700')
                                    .attr('class', 'tooltip')
                                    .style('background-color', 'white')
                                    .style('border', 'solid')
                                    .style('border-width', '2px')
                                    .style('border-radius', '5px')
                                    .style('padding', '5px')
                            var mouseover2 = function(d){
                                tooltip2.style('opacity', 1)
                                d3.select(this).style('stroke', 'red').style('stroke-width', 2)
                            }
                            var mousemoveBefore2 = 'Households w/ income < $15k: '
                            var mousemoveAfter2 = '%'
                            var mousemove2 = function(d, event){
                                var zipName2 = event.properties.ZDC_ID;
                                var zipInt2 = parseInt(zipName2);
                                var val2 = 0
                                if (zipsInZData.includes(zipInt2)){
                                    var onlyZip2 = zData.filter(k => k.zip == zipInt2)[0];
                                    val = onlyZip2[curGroup2]
                                }
                                tooltip2.html('Zip: '+zipName2+'<br>'+`${mousemoveBefore2}`+(val*100).toFixed(2)+`${mousemoveAfter2}`)
                                    .style('left', d.pageX-50).style('top', d.pageY-75)
                            }
                            var mouseleave2 = function(d){
                                tooltip2.style('opacity', 0)
                                d3.select(this).style('stroke', 'black').style('stroke-width', 1)
                            }
                            var compMap = svg2.append('g').selectAll('path').data(feats).join('path').attr('d', geoGenerator2).attr('stroke', 'black').attr('stroke-width', 1)
                            .attr('fill', function(d){
                                var zip = parseInt(d.properties.ZDC_ID);
                                if (zipsInZData.includes(zip)){
                                    var filt = zData.filter(k => k.zip == zip)[0]
                                    if (isNaN(filt.income_less_than_15k)){
                                        return 'white'
                                    }
                                    return cScale2(filt.income_less_than_15k)
                                }
                                else {
                                    return 'white'
                                }
                            })
                            .on('mouseover', mouseover2)
                            .on('mousemove', mousemove2)
                            .on('mouseleave', mouseleave2)
                            var isFiltered = false;
                            var button2 = d3.select('#toAdd4').append('button')
                                .attr('id', 'toFilter')
                                .style('font-size', 20)
                                .text('Filter for only zip codes that EyeMobile visits')
                                .on('click', function(click){
                                    if (isFiltered){
                                        compMap
                                            .transition()
                                            .duration(1000)
                                            .attr('fill', function(d){
                                                var z = parseInt(d.properties.ZDC_ID)
                                                if (zipsInZData.includes(z)){
                                                    var filt = zData.filter(k => k.zip == z)[0]
                                                    if (isNaN(filt[curGroup2])){
                                                        return 'white'
                                                    }
                                                    return cScale2(filt[curGroup2])
                                                }
                                                else {
                                                    return 'white'
                                                }
                                            })
                                        button2.text('Filter for only zip codes that EyeMobile visits')
                                        isFiltered = false;
                                    }
                                    else {
                                        compMap
                                            .transition()
                                            .duration(1000)
                                            .attr('fill', function(d){
                                                var z = parseInt(d.properties.ZDC_ID)
                                                if (zips.includes(z)){
                                                    var filt = zData.filter(k => k.zip == z)[0]
                                                    if (isNaN(filt[curGroup2])){
                                                        return 'white'
                                                    }
                                                    return cScale2(filt[curGroup2])
                                                }
                                                else {
                                                    return 'white'
                                                }
                                            })
                                        button2.text('Unfilter')
                                        isFiltered = true;
                                    }
                                })
                            var ii = true;
                            d3.select('#toAdd5').append('button')
                                .attr('id', 'scatterComp')
                                .style('font-size', 20)
                                .text('Draw comparison scatterplot')
                                .on('click', function(cl){
                                    if (ii){
                                        var w = 800;
                                        var h = 800;
                                        var p = 75;
                                        var svg3 = d3.select('#corrPlot').append('svg')
                                            .attr('transform', 'translate(0,-700)')
                                            .attr('width', w)
                                            .attr('height', h)
                                        var x = d3.scaleLinear().domain(d3.extent(ddScatter, d => d[globalGroup2]))
                                            .range([p, w-p]);
                                        var xAxis = svg3.append('g').call(d3.axisBottom(x))
                                            .attr('transform', 'translate(0, '+(h-p)+')')
                                        var y = d3.scaleLinear()
                                            .domain(d3.extent(ddScatter, d => d[globalGroup1]))
                                            .range([h-p, p]);
                                        var yAxis = svg3.append('g').call(d3.axisLeft(y))
                                            .attr('transform', 'translate('+p+',0)');
                                        var dots = svg3
                                            .selectAll('dot')
                                            .data(ddScatter)
                                            .join('circle')
                                                .attr('cx', d => x(d[globalGroup2]))
                                                .attr('cy', d => y(d[globalGroup1]))
                                                .attr('r', 4)
                                                .style('fill', '#115F76')
                                        var xLab = svg3.append('text').attr('x', w-50).attr('y', h-25)
                                            .style('text-anchor', 'end')
                                            .text(function(){
                                                if (globalGroup2 == 'income_less_than_15k'){
                                                    return '% households w/ income < $15k'
                                                }
                                                if (globalGroup2 == 'income_between_15_30'){
                                                    return '% households w/ income $15k-$30k'
                                                }
                                                if (globalGroup2 == 'income_between_30_50'){
                                                    return '% households w/ income $30k-$50k'
                                                }
                                                if (globalGroup2 == 'income_between_50_100'){
                                                    return '% households w/ income $50k-$100k'
                                                }
                                                if (globalGroup2 == 'income_greater_than_100'){
                                                    return '% households w/ income > $100k'
                                                }
                                                if (globalGroup2 == 'unemployment_rate'){
                                                    return 'Unemployment rate (%)'
                                                }
                                                if (globalGroup2 == 'professional_employment_rate'){
                                                    return 'Professional employment rate (%)'
                                                }
                                                if (globalGroup2 == 'income_12months_below_poverty'){
                                                    return '% households w/ income < 12 months below poverty line'
                                                }
                                                if (globalGroup2 == 'public_assistance_income'){
                                                    return '% households w/ public assistance income'
                                                }
                                                if (globalGroup2 == 'owner_occupied_house'){
                                                    return '% owner occupied houses'
                                                }
                                                if (globalGroup2 == 'prop_hispanic'){
                                                    return '% Hispanic population'
                                                }
                                                if (globalGroup2 == 'prop_white'){
                                                    return '% White population'
                                                }
                                                if (globalGroup2 == 'prop_black'){
                                                    return '% Black population'
                                                }
                                                if (globalGroup2 == 'prop_foreign'){
                                                    return '% foreign-born population'
                                                }
                                                if (globalGroup2 == 'less_than_high_school_diploma'){
                                                    return '% population w/ less than H.S. diploma'
                                                }
                                                if (globalGroup2 == 'high_school_diploma_some_college'){
                                                    return '% population w/ H.S. diploma & some college'
                                                }
                                                if (globalGroup2 == 'bachelors_prop'){
                                                    return "% population w/ Bachelor's degree"
                                                }
                                            })
                                        var yLab = svg3.append('text').attr('x', 25).attr('y', 50)
                                            .style('text-anchor', 'start')
                                            .text(function(){
                                                if (globalGroup1 == 'totalSchools'){
                                                    return 'Total schools'
                                                }
                                                if (globalGroup1 == 'refRate'){
                                                    return 'Referral rate'
                                                }
                                                if (globalGroup1 == 'showRate'){
                                                    return 'Exam completion rate'
                                                }
                                                if (globalGroup1 == 'glassesRate'){
                                                    return 'Glasses prescription rate'
                                                }
                                                if (globalGroup1 == 'astigRate'){
                                                    return 'Rate of astigmatism'
                                                }
                                                if (globalGroup1 == 'hypRate'){
                                                    return 'Rate of hyperopia'
                                                }
                                                if (globalGroup1 == 'myopRate'){
                                                    return 'Rate of myopia'
                                                }
                                                if (globalGroup1 == 'ambRate'){
                                                    return 'Rate of amblyopia'
                                                }
                                            })
                                        
                                        var correlation = function(group1, group2){
                                            var xMean = d3.mean(ddScatter, d => d[group1])
                                            var yMean = d3.mean(ddScatter, d => d[group2])
                                            var allX = ddScatter.map(d => d[group1])
                                            var allY = ddScatter.map(d => d[group2])
                                            var nomX = [];
                                            var nomY = [];
                                            allX.forEach(function(k){
                                                var sub = k - xMean;
                                                nomX.push(sub)
                                            })
                                            allY.forEach(function(k){
                                                var sub = k - yMean;
                                                nomY.push(sub)
                                            })
                                            var multNom = []
                                            for (let i = 0; i < nomX.length; i++) {
                                                multNom[i] = nomX[i] * nomY[i]
                                            }
                                            var nom = d3.sum(multNom)
                                            var denomX = [];
                                            var denomY = [];
                                            nomX.forEach(function(k){
                                                var sub = k ** 2;
                                                denomX.push(sub)
                                            })
                                            nomY.forEach(function(k){
                                                var sub = k ** 2;
                                                denomY.push(sub)
                                            })
                                            var denomSumX = d3.sum(denomX);
                                            var denomSumY = d3.sum(denomY);
                                            var denomMult = denomSumX * denomSumY
                                            var denom = Math.sqrt(denomMult);
                                            return (nom / denom)
                                        }
                                        var corr = correlation(globalGroup2, globalGroup1);
                                        var correlationText = svg3.append('text')
                                            .attr('x', w - 25)
                                            .attr('y', 50)
                                            .style('font-size', 20)
                                            .style('text-anchor', 'end')
                                            .text('Pearson correlation: '+corr);
                                        d3.select('#display').on('change', function(event, d){
                                            var vall = d3.select(this).property('value')
                                            updateDropdown(vall)
                                            corr = correlation(globalGroup2, vall)
                                            correlationText
                                                .transition('8')
                                                .duration(1500)
                                                .text('Pearson correlation: '+corr);
                                            y.domain(d3.extent(ddScatter, j => j[vall]))
                                            yLab
                                                .transition('5')
                                                .duration(1500)
                                                .text(function(){
                                                    if (vall == 'totalSchools'){
                                                        return 'Total schools'
                                                    }
                                                    if (vall == 'refRate'){
                                                        return 'Referral rate'
                                                    }
                                                    if (vall == 'showRate'){
                                                        return 'Exam completion rate'
                                                    }
                                                    if (vall == 'glassesRate'){
                                                        return 'Glasses prescription rate'
                                                    }
                                                    if (vall == 'astigRate'){
                                                        return 'Rate of astigmatism'
                                                    }
                                                    if (vall == 'hypRate'){
                                                        return 'Rate of hyperopia'
                                                    }
                                                    if (vall == 'myopRate'){
                                                        return 'Rate of myopia'
                                                    }
                                                    if (vall == 'ambRate'){
                                                        return 'Rate of amblyopia'
                                                    }
                                                })
                                            yAxis
                                                .transition('3')
                                                .duration(1500)
                                                .call(d3.axisLeft(y))
                                                
                                            dots
                                                .transition('1')
                                                .duration(1500)
                                                .attr('cy', j => y(j[vall]))
                                        })
                                        d3.select('#display2').on('change', function(event, d){
                                            var vall2 = d3.select(this).property('value')
                                            updateDropdown2(vall2)
                                            corr = correlation(vall2, globalGroup1)
                                            correlationText
                                                .transition('10')
                                                .duration(1500)
                                                .text('Pearson correlation: '+corr)
                                            x.domain(d3.extent(ddScatter, j => j[vall2]))
                                            xAxis
                                                .transition('4')
                                                .duration(1500)
                                                .call(d3.axisBottom(x))
                                            xLab
                                                .transition('6')
                                                .duration(1500)
                                                .text(function(){
                                                    if (vall2 == 'income_less_than_15k'){
                                                        return '% households w/ income < $15k'
                                                    }
                                                    if (vall2 == 'income_between_15_30'){
                                                        return '% households w/ income $15k-$30k'
                                                    }
                                                    if (vall2 == 'income_between_30_50'){
                                                        return '% households w/ income $30k-$50k'
                                                    }
                                                    if (vall2 == 'income_between_50_100'){
                                                        return '% households w/ income $50k-$100k'
                                                    }
                                                    if (vall2 == 'income_greater_than_100'){
                                                        return '% households w/ income > $100k'
                                                    }
                                                    if (vall2 == 'unemployment_rate'){
                                                        return 'Unemployment rate (%)'
                                                    }
                                                    if (vall2 == 'professional_employment_rate'){
                                                        return 'Professional employment rate (%)'
                                                    }
                                                    if (vall2 == 'income_12months_below_poverty'){
                                                        return '% households w/ income < 12 months below poverty line'
                                                    }
                                                    if (vall2 == 'public_assistance_income'){
                                                        return '% households w/ public assistance income'
                                                    }
                                                    if (vall2 == 'owner_occupied_house'){
                                                        return '% owner occupied houses'
                                                    }
                                                    if (vall2 == 'prop_hispanic'){
                                                        return '% Hispanic population'
                                                    }
                                                    if (vall2 == 'prop_white'){
                                                        return '% White population'
                                                    }
                                                    if (vall2 == 'prop_black'){
                                                        return '% Black population'
                                                    }
                                                    if (vall2 == 'prop_foreign'){
                                                        return '% foreign-born population'
                                                    }
                                                    if (vall2 == 'less_than_high_school_diploma'){
                                                        return '% population w/ less than H.S. diploma'
                                                    }
                                                    if (vall2 == 'high_school_diploma_some_college'){
                                                        return '% population w/ H.S. diploma & some college'
                                                    }
                                                    if (vall2 == 'bachelors_prop'){
                                                        return "% population w/ Bachelor's degree"
                                                    }
                                                })
                                            dots
                                                .transition('2')
                                                .duration(1500)
                                                .attr('cx', j => x(j[vall2]))
                                        })
                                        ii = false;
                                    }
                                })
                            var defs = svg2.append('defs')
                            var grad = defs.append('linearGradient')
                                .attr('id', 'grad2')
                                .attr('x1', '0%')
                                .attr('y1', '0%')
                                .attr('x2', '0%')
                                .attr('y2', '100%');
                            grad.append('stop')
                                .attr('offset', '0%')
                                .style('stop-color', '#EAF7FF')
                                .style('stop-opacity', 1);
                            grad.append('stop')
                                .attr('offset', '100%')
                                .style('stop-color', '#003559')
                                .style('stop-opacity', 1);
                            d3.select('#toAdd1').append('p').text('Compare')
                            d3.select('#toAdd2').append('p').text('with')
                            svg2.append('rect')
                                .attr('height', 150)
                                .attr('width', 20)
                                .attr('x', 3)
                                .attr('y', 300)
                                .style('stroke', 'black')
                                .style('stroke-width', 1)
                                .attr('class', 'legendRect')
                                .attr('fill', 'url(#grad2)')
                            var legend3 = svg2.append('text')
                                .attr('x', 28)
                                .attr('y', 312)
                                .text(cScale2.domain()[0].toFixed(2)*100+'%')
                            var legend4 = svg2.append('text')
                                .attr('x', 28)
                                .attr('y', 448)
                                .text((cScale2.domain()[1]).toFixed(2)*100+'%')
                            var title2 = svg2.append('text')
                                .attr('x', 800)
                                .attr('y', 15)
                                .style('text-anchor', 'end')
                                .style('font-size', 16)
                                .text('Proportion of households with income less than $15k')
                            var select2 = d3.select('#toAdd3').append('select').attr('name', 'display2').attr('id', 'display2')
                            select2.append('option')
                                .attr('value', 'income_less_than_15k')
                                .text('Income less than $15k')
                            select2.append('option')
                                .attr('value', 'income_between_15_30')
                                .text('Income between $15k-$30k')
                            select2.append('option')
                                .attr('value', 'income_between_30_50')
                                .text('Income between $30k-$50k')
                            select2.append('option')
                                .attr('value', 'income_between_50_100')
                                .text('Income between $50k-$100k')
                            select2.append('option')
                                .attr('value', 'income_greater_than_100')
                                .text('Income greater than $100k')
                            select2.append('option')
                                .attr('value', 'unemployment_rate')
                                .text('Unemployment rate')
                            select2.append('option')
                                .attr('value', 'professional_employment_rate')
                                .text('Professional employment rate')
                            select2.append('option')
                                .attr('value', 'income_12months_below_poverty')
                                .text('Prop. income 12 months below poverty')
                            select2.append('option')
                                .attr('value', 'public_assistance_income')
                                .text('Prop. public assistance income')
                            select2.append('option')
                                .attr('value', 'owner_occupied_house')
                                .text('Prop. of owner occupied house')
                            select2.append('option')
                                .attr('value', 'prop_hispanic')
                                .text('Proportion Hispanic')
                            select2.append('option')
                                .attr('value', 'prop_white')
                                .text('Proportion White')
                            select2.append('option')
                                .attr('value', 'prop_black')
                                .text('Proportion Black')
                            select2.append('option')
                                .attr('value', 'prop_foreign')
                                .text('Proportion of foreign born')
                            select2.append('option')
                                .attr('value', 'less_than_high_school_diploma')
                                .text('Prop. w/ less than H.S. diploma')
                            select2.append('option')
                                .attr('value', 'high_school_diploma_some_college')
                                .text('Prop. w/ H.S. diploma & some college')
                            select2.append('option')
                                .attr('value', 'bachelors_prop')
                                .text("Proportion of Bachelor's Degrees")
                            function updateDropdown2(grp){
                                isFiltered = false;
                                button2.text('Filter for only zip codes that EyeMobile visits')
                                curGroup2 = grp;
                                globalGroup2 = grp;
                                var colScale = d3.scaleSequential().domain(d3.extent(zData, d => d[curGroup2])).range(['white', '#003559']);
                                compMap
                                    .data(feats)
                                    .transition()
                                    .duration(1000)
                                    .attr('fill', function(d){
                                        var z = parseInt(d.properties.ZDC_ID)
                                        if (zipsInZData.includes(z)){
                                            var f = zData.filter(j => j.zip == z)[0]
                                            if (isNaN(f[curGroup2])){
                                                return 'white'
                                            }
                                            return colScale(f[curGroup2])
                                        }
                                        else {
                                            return 'white'
                                        }
                                    })
                                cScale2 = colScale;
                                legend3
                                    .transition()
                                    .duration(1000)
                                    .text(colScale.domain()[0].toFixed(2)*100+'%')
                                legend4
                                    .transition()
                                    .duration(1000)
                                    .text(colScale.domain()[1].toFixed(2)*100+'%')
                                if (curGroup2 == 'income_less_than_15k'){
                                    mousemoveBefore2 = 'Households w/ income < $15k: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with income less than $15k')
                                }
                                if (curGroup2 == 'income_between_15_30'){
                                    mousemoveBefore2 = 'Households w/ income $15k-$30k: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with income between $15k-$30k')
                                }
                                if (curGroup2 == 'income_between_30_50'){
                                    mousemoveBefore2 = 'Households w/ income $30k-$50k: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with income between $30k-$50k')
                                }
                                if (curGroup2 == 'income_between_50_100'){
                                    mousemoveBefore2 = 'Households w/ income $50k-$100k: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with income between $50k-$100k')
                                }
                                if (curGroup2 == 'income_greater_than_100'){
                                    mousemoveBefore2 = 'Households w/ income > $100k: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with income greater than $100k')
                                }
                                if (curGroup2 == 'unemployment_rate'){
                                    mousemoveBefore2 = 'Unemployment rate: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population unemployed')
                                }
                                if (curGroup2 == 'professional_employment_rate'){
                                    mousemoveBefore2 = 'Professional employment rate: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion employed in business/management/science/art careers')
                                }
                                if (curGroup2 == 'income_12months_below_poverty'){
                                    mousemoveBefore2 = 'Households w/ income 12 months below poverty line: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households less than 12 months below poverty line')
                                }
                                if (curGroup2 == 'public_assistance_income'){
                                    mousemoveBefore2 = 'Households w/ public assistance income: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of households with public assistance income')
                                }
                                if (curGroup2 == 'owner_occupied_house'){
                                    mousemoveBefore2 = 'Proportion of owner occupied houses: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of owner-occupied houses')
                                }
                                if (curGroup2 == 'prop_hispanic'){
                                    mousemoveBefore2 = 'Hispanic population: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population that is Hispanic')
                                }
                                if (curGroup2 == 'prop_white'){
                                    mousemoveBefore2 = 'White population: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population that is White')
                                }
                                if (curGroup2 == 'prop_black'){
                                    mousemoveBefore2 = 'Black population: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population that is Black')
                                }
                                if (curGroup2 == 'prop_foreign'){
                                    mousemoveBefore2 = 'Proportion of population foreign born: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population that was born in a foreign country')
                                }
                                if (curGroup2 == 'less_than_high_school_diploma'){
                                    mousemoveBefore2 = 'Proportion w/ less than H.S. diploma: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population with less than a high school diploma')
                                }
                                if (curGroup2 == 'high_school_diploma_some_college'){
                                    mousemoveBefore2 = 'Proportion w/ H.S. diploma & some college: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text('Proportion of population with HS diploma and some college')
                                }
                                if (curGroup2 == 'bachelors_prop'){
                                    mousemoveBefore2 = 'Proportion w/ bachelors degree: '
                                    mousemoveAfter2 = '%'
                                    title2
                                        .transition()
                                        .duration(1000)
                                        .text("Proportion of population with a Bachelor's degree")
                                }
                            }
                            d3.select('#display2').on('change', function(event, d){
                                var sDisp = d3.select(this).property('value')
                                updateDropdown2(sDisp)
                                console.log(globalGroup2)
                            })
                        }
                        isComparison = true;
                    })
                
                d3.select('#display').on('change', function(event, d){
                    var selectDisplay = d3.select(this).property('value')
                    updateDropdown(selectDisplay)
                    console.log(globalGroup1)
                })
            })
            })
        })
    })
}