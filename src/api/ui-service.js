
import router from '../router'
export default {

  processing(spin) {
    spin.show({
      render: (h) => {
        return h('div', [
          h('Icon', {
            'class': 'spin-icon-load',
            props: {
              type: 'ios-loading',
              size: 30
            }
          }),
          h('div', {
            'class': 'spin-message',
          },
            "流程正在启动中...")
        ])
      }
    })
  },

  successful(spin) {
    let count = 3;
    this.show(spin, `操作成功<br/>即将转向首页(${count}秒)`)
    this.timer = setInterval(() => {

      count--;
      if (count === 0) {
        spin.hide();
        router.push({ name: "MyTask" });
        clearInterval(this.timer)

      } else {

        this.show(spin, `操作成功<br/>即将转向首页(${count}秒)`)
      }
    }, 1000);
  },

  fail(spin, message) {
    let count = 3;
    this.show(spin, `操作失败:${message}<br/>${count}秒后关闭`)
    this.timer = setInterval(() => {

      count--;
      if (count === 0) {
        spin.hide();
        clearInterval(this.timer)

      } else {

        this.show(spin, `操作失败:${message}<br/>${count}秒后关闭`)
      }
    }, 1000);
  },

  show(spin, message = '') {
    if (document.getElementsByClassName('spin-message')[0]) {
      // console.log(message);
      document.getElementsByClassName('spin-message')[0].innerHTML = message;
    }

    spin.show({
      render: (h) => {
        return h('div', [
          h('Icon', {
            'class': 'spin-icon-load',
            props: {
              type: 'ios-loading',
              size: 30
            }
          }),
          h('div', {
            'class': 'spin-message',
          },
            message)
        ])
      }
    })
  }
}