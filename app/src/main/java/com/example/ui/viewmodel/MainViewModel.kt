package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.data.local.AppDatabase
import com.example.data.model.ProjectConfig
import com.example.data.repository.ProjectConfigRepository
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: ProjectConfigRepository

    init {
        val database = AppDatabase.getDatabase(application)
        repository = ProjectConfigRepository(database.projectConfigDao())
    }

    // Saved Configs from Room
    val savedConfigs: StateFlow<List<ProjectConfig>> = repository.allConfigs
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    // Current navigation tab
    private val _currentTab = MutableStateFlow(0)
    val currentTab: StateFlow<Int> = _currentTab.asStateFlow()

    fun selectTab(tab: Int) {
        _currentTab.value = tab
    }

    // AdSense Sim State
    private val _selectedAdSenseType = MutableStateFlow("Banner") // Banner, In-Feed, In-Article, Vignette
    val selectedAdSenseType: StateFlow<String> = _selectedAdSenseType.asStateFlow()

    private val _adsenseClientId = MutableStateFlow("ca-pub-1234567890123456")
    val adsenseClientId: StateFlow<String> = _adsenseClientId.asStateFlow()

    private val _adsenseResponsive = MutableStateFlow(true)
    val adsenseResponsive: StateFlow<Boolean> = _adsenseResponsive.asStateFlow()

    fun setAdSenseType(type: String) {
        _selectedAdSenseType.value = type
    }

    fun setAdSenseClientId(id: String) {
        _adsenseClientId.value = id
    }

    fun toggleAdSenseResponsive() {
        _adsenseResponsive.value = !_adsenseResponsive.value
    }

    // AdMob Sim State
    private val _devCredits = MutableStateFlow(0)
    val devCredits: StateFlow<Int> = _devCredits.asStateFlow()

    private val _showAdMobBanner = MutableStateFlow(false)
    val showAdMobBanner: StateFlow<Boolean> = _showAdMobBanner.asStateFlow()

    private val _isInterstitialShowing = MutableStateFlow(false)
    val isInterstitialShowing: StateFlow<Boolean> = _isInterstitialShowing.asStateFlow()

    private val _interstitialTimer = MutableStateFlow(3)
    val interstitialTimer: StateFlow<Int> = _interstitialTimer.asStateFlow()

    private val _isRewardedShowing = MutableStateFlow(false)
    val isRewardedShowing: StateFlow<Boolean> = _isRewardedShowing.asStateFlow()

    private val _rewardedTimer = MutableStateFlow(5)
    val rewardedTimer: StateFlow<Int> = _rewardedTimer.asStateFlow()

    private val _rewardToast = MutableStateFlow<String?>(null)
    val rewardToast: StateFlow<String?> = _rewardToast.asStateFlow()

    fun toggleAdMobBanner(show: Boolean) {
        _showAdMobBanner.value = show
    }

    fun triggerInterstitial() {
        _isInterstitialShowing.value = true
        _interstitialTimer.value = 3
        viewModelScope.launch {
            while (_interstitialTimer.value > 0) {
                delay(1000)
                _interstitialTimer.value -= 1
            }
        }
    }

    fun dismissInterstitial() {
        _isInterstitialShowing.value = false
        showToast("Mock Interstitial Ad Dismissed")
    }

    fun triggerRewarded() {
        _isRewardedShowing.value = true
        _rewardedTimer.value = 5
        viewModelScope.launch {
            while (_rewardedTimer.value > 0) {
                delay(1000)
                _rewardedTimer.value -= 1
            }
        }
    }

    fun claimReward() {
        _isRewardedShowing.value = false
        _devCredits.value += 100
        showToast("Success: +100 Dev Credits added to wallet!")
    }

    fun dismissRewarded() {
        _isRewardedShowing.value = false
        showToast("Mock Rewarded Ad Closed without reward")
    }

    private fun showToast(msg: String) {
        viewModelScope.launch {
            _rewardToast.value = msg
            delay(3000)
            if (_rewardToast.value == msg) {
                _rewardToast.value = null
            }
        }
    }

    fun clearToast() {
        _rewardToast.value = null
    }

    // Revenue Calculator State
    private val _dailyTraffic = MutableStateFlow(5000f) // Slider from 100 to 1000000
    val dailyTraffic: StateFlow<Float> = _dailyTraffic.asStateFlow()

    private val _clickThroughRate = MutableStateFlow(2.5f) // Slider from 0.1% to 20%
    val clickThroughRate: StateFlow<Float> = _clickThroughRate.asStateFlow()

    private val _costPerClick = MutableStateFlow(0.45f) // Slider from $0.05 to $5.00
    val costPerClick: StateFlow<Float> = _costPerClick.asStateFlow()

    private val _cpmValue = MutableStateFlow(1.50f) // Slider from $0.10 to $15.00
    val cpmValue: StateFlow<Float> = _cpmValue.asStateFlow()

    fun updateDailyTraffic(value: Float) {
        _dailyTraffic.value = value
    }

    fun updateCTR(value: Float) {
        _clickThroughRate.value = value
    }

    fun updateCPC(value: Float) {
        _costPerClick.value = value
    }

    fun updateCPM(value: Float) {
        _cpmValue.value = value
    }

    // Derived Calculator Formulas
    // Daily clicks = traffic * (CTR / 100)
    // Daily Click Revenue = clicks * CPC
    // Daily Impression Revenue = (traffic / 1000) * CPM
    // Total Revenue = Click Revenue + Impression Revenue
    fun calculateEarnings(): CalculatorResult {
        val traffic = _dailyTraffic.value
        val ctr = _clickThroughRate.value / 100f
        val cpc = _costPerClick.value
        val cpm = _cpmValue.value

        val dailyClicks = traffic * ctr
        val dailyClickRevenue = dailyClicks * cpc
        val dailyImpressionRevenue = (traffic / 1000f) * cpm
        val dailyTotal = dailyClickRevenue + dailyImpressionRevenue

        return CalculatorResult(
            daily = dailyTotal,
            monthly = dailyTotal * 30.4f,
            yearly = dailyTotal * 365f,
            clicks = dailyClicks.toInt()
        )
    }

    // Room Database Operations
    fun saveConfig(title: String, platform: String, adUnitId: String, notes: String) {
        viewModelScope.launch {
            repository.insert(
                ProjectConfig(
                    title = title,
                    platform = platform,
                    adUnitId = adUnitId,
                    notes = notes
                )
            )
            showToast("Saved config: $title")
        }
    }

    fun deleteConfig(config: ProjectConfig) {
        viewModelScope.launch {
            repository.delete(config)
            showToast("Deleted config: ${config.title}")
        }
    }
}

data class CalculatorResult(
    val daily: Float,
    val monthly: Float,
    val yearly: Float,
    val clicks: Int
)

class MainViewModelFactory(private val application: Application) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return MainViewModel(application) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
