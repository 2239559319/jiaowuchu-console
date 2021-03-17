const timer = setInterval((username, courseNum, ...courseIds) => {
  $.ajax({
    url: '/student/courseSelect/freeCourse/courseList',
    method: 'post',
    data: {
      searchtj: courseNum,
      xq: '0',
      jc: '0',
      kclbdm: '',
    },
    success(data) {
      const coursesList = JSON.parse(data['rwRxkZlList']);
      for (const course of coursesList) {
        for (const courseId of courseIds) {
          if (course.kxh === courseId && course.bkskyl > 0) {
            const kcm =
              course.kcm.replace(/#@urp001@#/g, "'") +
              '(' +
              course.kch +
              '@' +
              course.kxh +
              ')';
            let kcms = '';
            for (let i = 0; i < kcm.length; i++) {
              kcms += kcm.charCodeAt(i) + ',';
            }
            const data = {
              dealType: '5',
              kcIds: course.kch + '@' + course.kxh + '@' + course.zxjxjhh,
              kcms: kcms,
              fajhh: document.querySelector('input[name="fajhh"]').value,
              sj: '0_0',
              searchtj: courseNum,
              kclbdm: '',
              inputCode: '',
              tokenValue: $('#tokenValue').val(),
            };
            $.ajax({
              url: '/student/courseSelect/selectCourse/checkInputCodeAndSubmit',
              type: 'post',
              data: data,
              success(data) {
                $.ajax({
                  url: '/student/courseSelect/selectResult/query',
                  type: 'post',
                  data: {
                    kcNum: '1',
                    redisKey: username + '5',
                  },
                  success(data) {
                    if (data['result'][0].endsWith('选课成功！')) {
                      console.log('选课成功');
                      clearInterval(timer);
                    }
                  },
                });
              },
            });
          }
        }
      }
    },
  });
}, Math.random() * 1000 + 1000, '0000000001', '304052020', '01', '02', '03');
