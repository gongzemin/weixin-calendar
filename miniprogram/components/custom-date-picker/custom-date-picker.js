Component({
	data: {
	  showDatePicker: false, // 控制日期选择器显示与隐藏
	  years: [],
	  months: [],
	  days: [],
	  selectedYearIndex: 0,
	  selectedMonthIndex: 0,
	  selectedDayIndex: 0,
	},
	lifetimes: {
	  attached() {
		this.initDatePicker();
	  },
	},
	methods: {
	  // 初始化日期选择器
	  initDatePicker() {
		const years = [];
		const months = [];
		const days = [];
	
		const currentYear = new Date().getFullYear();
	
		for (let i = 1900; i <= currentYear; i++) {
		  years.push(i);
		}
	
		for (let i = 1; i <= 12; i++) {
		  months.push(i);
		}
	
		// 默认30天，之后会根据月份调整
		for (let i = 1; i <= 30; i++) {
		  days.push(i);
		}
	
		this.setData({
		  years,
		  months,
		  days,
		});
	  },

	    // 切换日期选择器显示与隐藏
		toggleDatePicker() {
			this.setData({
			showDatePicker: !this.data.showDatePicker
			});
		},
	
	  // 滚动选择年
	  onYearScroll(e) {
		const index = Math.round(e.detail.scrollTop / 40);
		this.setData({
		  selectedYearIndex: Math.max(0, Math.min(index, this.data.years.length - 1))
		});
		this.updateDays();
	  },
	
	  // 滚动选择月
	  onMonthScroll(e) {
		const index = Math.round(e.detail.scrollTop / 40);
		this.setData({
		  selectedMonthIndex: Math.max(0, Math.min(index, this.data.months.length - 1))
		});
		this.updateDays();
	  },
	
	  // 滚动选择日
	  onDayScroll(e) {
		const index = Math.round(e.detail.scrollTop / 40);
		this.setData({
		  selectedDayIndex: Math.max(0, Math.min(index, this.data.days.length - 1))
		});
	  },
	
	  onYearTap(e) {
		const selectedYearIndex = e.currentTarget.dataset.index; // Get the index of the tapped year
		this.setData({
		  selectedYearIndex
		});
		this.updateDays();
	  },
	
	  onMonthTap(e) {
		const selectedMonthIndex = e.currentTarget.dataset.index; // Get the index of the tapped month
		console.log('selectedMonthIndex--', selectedMonthIndex)
		this.setData({
		  selectedMonthIndex
		});
		this.updateDays();
	  },
	
	  onDayTap(e) {
		const selectedDayIndex = e.currentTarget.dataset.index; // Get the index of the tapped day
		this.setData({
		  selectedDayIndex
		});
	  },
	
	  // 根据年份和月份动态更新天数
	  updateDays() {
		const { selectedYearIndex, selectedMonthIndex, years, months } = this.data;
		const year = years[selectedYearIndex];
		const month = months[selectedMonthIndex];
		const daysInMonth = new Date(year, month, 0).getDate();
		
		const days = [];
		for (let i = 1; i <= daysInMonth; i++) {
		  days.push(i);
		}
	
		this.setData({ days });
	  },
	
	  // 确认选择的日期
	  confirmDate() {
		const { years, months, days, selectedYearIndex, selectedMonthIndex, selectedDayIndex } = this.data;
		const selectedDate = `${years[selectedYearIndex]}-${months[selectedMonthIndex]}-${days[selectedDayIndex]}`;
		this.triggerEvent('dateConfirm', { selectedDate });
		this.setData({
		  showDatePicker: false // 隐藏日期选择器
		});
	  }
	}
  });