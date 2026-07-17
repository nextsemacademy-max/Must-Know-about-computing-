package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.ProjectConfig
import com.example.ui.theme.*
import com.example.ui.viewmodel.MainViewModel
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppScreen(viewModel: MainViewModel) {
    val context = LocalContext.current
    val currentTab by viewModel.currentTab.collectAsStateWithLifecycle()
    val rewardToast by viewModel.rewardToast.collectAsStateWithLifecycle()

    // Handle incoming reward toast notifications
    LaunchedEffect(rewardToast) {
        rewardToast?.let {
            Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
            viewModel.clearToast()
        }
    }

    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val isWide = maxWidth > 600.dp

        Row(modifier = Modifier.fillMaxSize()) {
            if (isWide) {
                // Side Navigation Rail for tablets, Chromebooks, and landscape devices
                NavigationRail(
                    containerColor = BentoNavBg,
                    modifier = Modifier.fillMaxHeight().testTag("side_navigation_rail")
                ) {
                    Spacer(modifier = Modifier.height(16.dp))
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color(0xFFE2E2E6), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("📊", fontSize = 20.sp)
                    }
                    Spacer(modifier = Modifier.height(24.dp))
                    listOf(
                        NavigationItem("Overview", Icons.Default.Dashboard, Icons.Outlined.Dashboard),
                        NavigationItem("AdSense Web", Icons.Default.Language, Icons.Outlined.Language),
                        NavigationItem("AdMob Mobile", Icons.Default.PhoneAndroid, Icons.Outlined.PhoneAndroid),
                        NavigationItem("Calculator", Icons.Default.Calculate, Icons.Outlined.Calculate),
                        NavigationItem("My Configs", Icons.Default.Folder, Icons.Outlined.Folder)
                    ).forEachIndexed { index, item ->
                        NavigationRailItem(
                            selected = currentTab == index,
                            onClick = { viewModel.selectTab(index) },
                            colors = NavigationRailItemDefaults.colors(
                                selectedIconColor = BentoTextPrimary,
                                selectedTextColor = BentoTextPrimary,
                                unselectedIconColor = BentoTextSecondary,
                                unselectedTextColor = BentoTextSecondary,
                                indicatorColor = BentoNavActive
                            ),
                            icon = {
                                Icon(
                                    imageVector = if (currentTab == index) item.selectedIcon else item.unselectedIcon,
                                    contentDescription = item.title
                                )
                            },
                            label = { Text(item.title, style = MaterialTheme.typography.bodySmall) },
                            modifier = Modifier.testTag("rail_item_$index")
                        )
                    }
                }
            }

            // Primary screen workspace
            Scaffold(
                topBar = {
                    TopAppBar(
                        title = {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(40.dp)
                                        .background(Color(0xFFE2E2E6), CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text("📊", fontSize = 20.sp)
                                }
                                Spacer(modifier = Modifier.width(12.dp))
                                Column {
                                    Text(
                                        text = "DevConsole",
                                        fontWeight = FontWeight.SemiBold,
                                        style = MaterialTheme.typography.titleMedium,
                                        color = BentoTextPrimary
                                    )
                                    Text(
                                        text = "Full-Stack Monitor",
                                        style = MaterialTheme.typography.labelSmall,
                                        color = BentoTextSecondary
                                    )
                                }
                            }
                        },
                        actions = {
                            // Dev credits wallet balance
                            val credits by viewModel.devCredits.collectAsStateWithLifecycle()
                            Row(
                                modifier = Modifier
                                    .padding(end = 12.dp)
                                    .background(
                                        color = BentoCoral,
                                        shape = RoundedCornerShape(16.dp)
                                    )
                                    .border(1.dp, BentoCoralBorder, RoundedCornerShape(16.dp))
                                    .padding(horizontal = 12.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Star,
                                    contentDescription = "Wallet Credits",
                                    tint = BentoCoralText,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(
                                    text = "$credits Credits",
                                    style = MaterialTheme.typography.labelMedium,
                                    fontWeight = FontWeight.Bold,
                                    color = BentoCoralText
                                )
                            }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(
                            containerColor = BentoBg
                        )
                    )
                },
                bottomBar = {
                    if (!isWide) {
                        // Bottom Navigation Bar for phone devices
                        Column {
                            Divider(color = BentoNavBorder, thickness = 1.dp)
                            NavigationBar(
                                containerColor = BentoNavBg,
                                tonalElevation = 0.dp,
                                modifier = Modifier.testTag("bottom_navigation_bar")
                            ) {
                                listOf(
                                    NavigationItem("Overview", Icons.Default.Dashboard, Icons.Outlined.Dashboard),
                                    NavigationItem("AdSense", Icons.Default.Language, Icons.Outlined.Language),
                                    NavigationItem("AdMob", Icons.Default.PhoneAndroid, Icons.Outlined.PhoneAndroid),
                                    NavigationItem("Calculator", Icons.Default.Calculate, Icons.Outlined.Calculate),
                                    NavigationItem("My Notebook", Icons.Default.Folder, Icons.Outlined.Folder)
                                ).forEachIndexed { index, item ->
                                    NavigationBarItem(
                                        selected = currentTab == index,
                                        onClick = { viewModel.selectTab(index) },
                                        colors = NavigationBarItemDefaults.colors(
                                            selectedIconColor = BentoTextPrimary,
                                            selectedTextColor = BentoTextPrimary,
                                            unselectedIconColor = BentoTextSecondary,
                                            unselectedTextColor = BentoTextSecondary,
                                            indicatorColor = BentoNavActive
                                        ),
                                        icon = {
                                            Icon(
                                                imageVector = if (currentTab == index) item.selectedIcon else item.unselectedIcon,
                                                contentDescription = item.title
                                            )
                                        },
                                        label = {
                                            Text(
                                                text = item.title,
                                                maxLines = 1,
                                                overflow = TextOverflow.Ellipsis
                                            )
                                        },
                                        modifier = Modifier.testTag("nav_item_$index")
                                    )
                                }
                            }
                        }
                    }
                }
            ) { innerPadding ->
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(innerPadding)
                ) {
                    when (currentTab) {
                        0 -> DashboardScreen(viewModel)
                        1 -> AdSenseScreen(viewModel)
                        2 -> AdMobScreen(viewModel)
                        3 -> CalculatorScreen(viewModel)
                        4 -> ConfigsScreen(viewModel)
                    }

                    // Display mock AdMob Banner Ad overlay globally at the bottom if active
                    val showBannerAd by viewModel.showAdMobBanner.collectAsStateWithLifecycle()
                    if (showBannerAd) {
                        Box(
                            modifier = Modifier
                                .align(Alignment.BottomCenter)
                                .fillMaxWidth()
                                .background(MaterialTheme.colorScheme.primaryContainer)
                                .border(1.dp, MaterialTheme.colorScheme.primary)
                                .padding(8.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .background(Color(0xFFF59E0B), RoundedCornerShape(4.dp))
                                            .padding(horizontal = 4.dp, vertical = 2.dp)
                                    ) {
                                        Text(
                                            text = "Ad",
                                            color = Color.Black,
                                            fontSize = 9.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Column {
                                        Text(
                                            text = "Mock AdMob Mobile Banner Ad",
                                            style = MaterialTheme.typography.labelLarge,
                                            fontWeight = FontWeight.Bold,
                                            color = MaterialTheme.colorScheme.onPrimaryContainer
                                        )
                                        Text(
                                            text = "Sample Banner Ad size 320x50 configured successfully.",
                                            style = MaterialTheme.typography.bodySmall,
                                            color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.8f)
                                        )
                                    }
                                }
                                IconButton(
                                    onClick = { viewModel.toggleAdMobBanner(false) },
                                    modifier = Modifier.size(24.dp).testTag("close_banner_ad")
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Close,
                                        contentDescription = "Close Ad",
                                        tint = MaterialTheme.colorScheme.onPrimaryContainer,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }
                        }
                    }

                    // Display Full Screen Mock Interstitial Ad
                    val isInterstitialShowing by viewModel.isInterstitialShowing.collectAsStateWithLifecycle()
                    val interstitialTimer by viewModel.interstitialTimer.collectAsStateWithLifecycle()
                    if (isInterstitialShowing) {
                        Dialog(
                            onDismissRequest = { if (interstitialTimer <= 0) viewModel.dismissInterstitial() },
                            properties = DialogProperties(usePlatformDefaultWidth = false)
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .background(Color.Black.copy(alpha = 0.9f))
                                    .padding(24.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth(0.9f)
                                        .background(Color(0xFF1E293B), RoundedCornerShape(16.dp))
                                        .border(2.dp, Color(0xFF38BDF8), RoundedCornerShape(16.dp))
                                        .padding(24.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Box(
                                            modifier = Modifier
                                                .background(Color(0xFFF59E0B), RoundedCornerShape(4.dp))
                                                .padding(horizontal = 6.dp, vertical = 3.dp)
                                        ) {
                                            Text(
                                                text = "SPONSORED AD",
                                                color = Color.Black,
                                                fontSize = 10.sp,
                                                fontWeight = FontWeight.Bold
                                            )
                                        }
                                        if (interstitialTimer > 0) {
                                            Text(
                                                text = "Close in $interstitialTimer s",
                                                color = Color.White.copy(alpha = 0.6f),
                                                style = MaterialTheme.typography.bodySmall
                                            )
                                        } else {
                                            IconButton(
                                                onClick = { viewModel.dismissInterstitial() },
                                                modifier = Modifier.background(Color.White.copy(alpha = 0.15f), CircleShape).testTag("dismiss_interstitial")
                                            ) {
                                                Icon(
                                                    imageVector = Icons.Default.Close,
                                                    contentDescription = "Close Ad",
                                                    tint = Color.White
                                                )
                                            }
                                        }
                                    }

                                    Spacer(modifier = Modifier.height(24.dp))

                                    Icon(
                                        imageVector = Icons.Default.RocketLaunch,
                                        contentDescription = "Interstital Promotion",
                                        tint = Color(0xFF38BDF8),
                                        modifier = Modifier.size(72.dp)
                                    )

                                    Spacer(modifier = Modifier.height(16.dp))

                                    Text(
                                        text = "Optimize Your Full Stack App!",
                                        style = MaterialTheme.typography.headlineSmall,
                                        fontWeight = FontWeight.Bold,
                                        color = Color.White,
                                        textAlign = TextAlign.Center
                                    )

                                    Spacer(modifier = Modifier.height(8.dp))

                                    Text(
                                        text = "Launch serverless backends and integrate automated AdMob campaigns instantly with our cloud suite.",
                                        style = MaterialTheme.typography.bodyMedium,
                                        color = Color.White.copy(alpha = 0.8f),
                                        textAlign = TextAlign.Center
                                    )

                                    Spacer(modifier = Modifier.height(24.dp))

                                    Button(
                                        onClick = { if (interstitialTimer <= 0) viewModel.dismissInterstitial() },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF38BDF8)),
                                        modifier = Modifier.fillMaxWidth().height(48.dp)
                                    ) {
                                        Text(
                                            text = if (interstitialTimer > 0) "Viewing Offer..." else "Download Suite Now",
                                            color = Color.Black,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }
                            }
                        }
                    }

                    // Display Full Screen Mock Rewarded Video Ad
                    val isRewardedShowing by viewModel.isRewardedShowing.collectAsStateWithLifecycle()
                    val rewardedTimer by viewModel.rewardedTimer.collectAsStateWithLifecycle()
                    if (isRewardedShowing) {
                        Dialog(
                            onDismissRequest = { /* Force user to watch */ },
                            properties = DialogProperties(usePlatformDefaultWidth = false, dismissOnBackPress = false, dismissOnClickOutside = false)
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .background(Color.Black)
                                    .padding(24.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(Color(0xFF0F172A), RoundedCornerShape(24.dp))
                                        .border(2.dp, Color(0xFF34D399), RoundedCornerShape(24.dp))
                                        .padding(24.dp),
                                    horizontalAlignment = Alignment.CenterHorizontally
                                ) {
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Row(verticalAlignment = Alignment.CenterVertically) {
                                            Icon(
                                                imageVector = Icons.Default.PlayCircle,
                                                contentDescription = "Playing ad",
                                                tint = Color(0xFF34D399),
                                                modifier = Modifier.size(20.dp)
                                            )
                                            Spacer(modifier = Modifier.width(6.dp))
                                            Text(
                                                text = "Simulated Video Ad",
                                                color = Color.White,
                                                fontWeight = FontWeight.SemiBold,
                                                fontSize = 14.sp
                                            )
                                        }

                                        if (rewardedTimer > 0) {
                                            Box(
                                                modifier = Modifier
                                                    .background(Color(0xFF34D399).copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                                                    .padding(horizontal = 10.dp, vertical = 4.dp)
                                            ) {
                                                Text(
                                                    text = "Reward in $rewardedTimer s",
                                                    color = Color(0xFF34D399),
                                                    fontSize = 12.sp,
                                                    fontWeight = FontWeight.Bold
                                                )
                                            }
                                        } else {
                                            IconButton(
                                                onClick = { viewModel.claimReward() },
                                                modifier = Modifier.background(Color(0xFF34D399), CircleShape).size(32.dp).testTag("claim_reward")
                                            ) {
                                                Icon(
                                                    imageVector = Icons.Default.Check,
                                                    contentDescription = "Claim Reward",
                                                    tint = Color.Black
                                                )
                                            }
                                        }
                                    }

                                    Spacer(modifier = Modifier.height(36.dp))

                                    // Simulated running video progress card
                                    Box(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .height(180.dp)
                                            .clip(RoundedCornerShape(16.dp))
                                            .background(
                                                Brush.linearGradient(
                                                    colors = listOf(Color(0xFF1E1B4B), Color(0xFF020617))
                                                )
                                            )
                                            .border(1.dp, Color.White.copy(alpha = 0.1f), RoundedCornerShape(16.dp)),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                            Icon(
                                                imageVector = Icons.Default.VideogameAsset,
                                                contentDescription = "Game promo",
                                                tint = Color(0xFF34D399),
                                                modifier = Modifier.size(64.dp)
                                            )
                                            Spacer(modifier = Modifier.height(8.dp))
                                            Text(
                                                text = "Play 'Pixel Miner' Quest!",
                                                color = Color.White,
                                                fontWeight = FontWeight.Bold,
                                                style = MaterialTheme.typography.titleMedium
                                            )
                                            Text(
                                                text = "Unlock levels. Mine blocks. Claim tokens.",
                                                color = Color.White.copy(alpha = 0.6f),
                                                style = MaterialTheme.typography.bodySmall
                                            )
                                        }

                                        // Progress bar
                                        Box(
                                            modifier = Modifier
                                                .align(Alignment.BottomCenter)
                                                .fillMaxWidth()
                                                .height(6.dp)
                                                .background(Color.White.copy(alpha = 0.2f))
                                        ) {
                                            Box(
                                                modifier = Modifier
                                                    .fillMaxHeight()
                                                    .fillMaxWidth((5f - rewardedTimer) / 5f)
                                                    .background(Color(0xFF34D399))
                                            )
                                        }
                                    }

                                    Spacer(modifier = Modifier.height(24.dp))

                                    Text(
                                        text = if (rewardedTimer > 0) "Complete video to claim reward" else "Ad completed!",
                                        color = Color.White,
                                        style = MaterialTheme.typography.bodyMedium,
                                        fontWeight = FontWeight.SemiBold
                                    )

                                    Spacer(modifier = Modifier.height(16.dp))

                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                                    ) {
                                        OutlinedButton(
                                            onClick = { viewModel.dismissRewarded() },
                                            modifier = Modifier.weight(1f),
                                            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White.copy(alpha = 0.7f))
                                        ) {
                                            Text("Cancel")
                                        }

                                        Button(
                                            onClick = { viewModel.claimReward() },
                                            enabled = rewardedTimer <= 0,
                                            modifier = Modifier.weight(1f),
                                            colors = ButtonDefaults.buttonColors(
                                                containerColor = Color(0xFF34D399),
                                                disabledContainerColor = Color(0xFF34D399).copy(alpha = 0.3f),
                                                contentColor = Color.Black
                                            )
                                        ) {
                                            Text("Claim +100 Credits")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Data class representation for tabs
data class NavigationItem(
    val title: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector
)

// Global Helper: Code Snippet Viewer with copy functionality
@Composable
fun CodeSnippetViewer(code: String, title: String) {
    val context = LocalContext.current
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFF0F172A))
            .border(1.dp, Color.White.copy(alpha = 0.15f), RoundedCornerShape(8.dp))
            .padding(12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = title,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF38BDF8),
                fontSize = 12.sp
            )
            IconButton(
                onClick = {
                    val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                    val clip = ClipData.newPlainText("Code Recipe", code)
                    clipboard.setPrimaryClip(clip)
                    Toast.makeText(context, "Code copied to clipboard!", Toast.LENGTH_SHORT).show()
                },
                modifier = Modifier.size(24.dp).testTag("copy_code_btn")
            ) {
                Icon(
                    imageVector = Icons.Default.ContentCopy,
                    contentDescription = "Copy Code",
                    tint = Color.White.copy(alpha = 0.7f),
                    modifier = Modifier.size(16.dp)
                )
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = code,
            fontFamily = FontFamily.Monospace,
            color = Color(0xFFE2E8F0),
            fontSize = 11.sp,
            lineHeight = 16.sp,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

// SECTION 1: DASHBOARD / MONETIZATION OVERVIEW
@Composable
fun DashboardScreen(viewModel: MainViewModel) {
    val result = viewModel.calculateEarnings()
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BentoBg)
            .padding(16.dp)
            .testTag("dashboard_screen"),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            // Intro Header Card
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .background(Color(0xFFE2E2E6), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("📊", fontSize = 24.sp)
                    }
                    Column {
                        Text(
                            text = "DevConsole",
                            style = MaterialTheme.typography.titleLarge,
                            fontWeight = FontWeight.Bold,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = "Full-Stack Monitor & Monetization Hub",
                            style = MaterialTheme.typography.bodyMedium,
                            color = BentoTextSecondary
                        )
                    }
                }
            }
        }

        item {
            // Large Bento Card: Total Ad Revenue (Coral)
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoCoral),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoCoralBorder),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(20.dp)
                ) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Total Ad Revenue",
                            fontWeight = FontWeight.Medium,
                            style = MaterialTheme.typography.titleMedium,
                            color = BentoCoralText
                        )
                        Box(
                            modifier = Modifier
                                .background(Color(0xFFF9EBE9), RoundedCornerShape(8.dp))
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(
                                text = "LIVE",
                                fontWeight = FontWeight.Bold,
                                fontSize = 10.sp,
                                color = BentoCoralText
                            )
                        }
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = String.format(Locale.US, "$%.2f", result.monthly),
                        style = MaterialTheme.typography.displayMedium.copy(letterSpacing = (-1.5).sp),
                        fontWeight = FontWeight.Light,
                        color = BentoCoralText
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "↑ 12% from yesterday (Estimated Monthly)",
                        style = MaterialTheme.typography.bodySmall,
                        color = BentoCoralText.copy(alpha = 0.7f)
                    )
                }
            }
        }

        item {
            // Side-by-side Bento Cards (AdSense & AdMob)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // AdSense Box (Blue)
                Card(
                    modifier = Modifier
                        .weight(1f)
                        .height(140.dp),
                    colors = CardDefaults.cardColors(containerColor = BentoBlue),
                    shape = RoundedCornerShape(24.dp),
                    border = BorderStroke(1.dp, BentoBlueBorder)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(14.dp),
                        verticalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Text("🌐", fontSize = 18.sp)
                            Text(
                                text = "AdSense",
                                fontWeight = FontWeight.SemiBold,
                                style = MaterialTheme.typography.labelLarge,
                                color = BentoBlueText
                            )
                        }
                        Column {
                            Text(
                                text = String.format(Locale.US, "$%.2f", result.monthly * 0.40f),
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.SemiBold,
                                color = BentoTextPrimary
                            )
                            Text(
                                text = "WEB TRAFFIC",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = BentoBlueText.copy(alpha = 0.6f)
                            )
                        }
                    }
                }

                // AdMob Box (Green)
                Card(
                    modifier = Modifier
                        .weight(1f)
                        .height(140.dp),
                    colors = CardDefaults.cardColors(containerColor = BentoGreen),
                    shape = RoundedCornerShape(24.dp),
                    border = BorderStroke(1.dp, BentoGreenBorder)
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(14.dp),
                        verticalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Text("📱", fontSize = 18.sp)
                            Text(
                                text = "AdMob",
                                fontWeight = FontWeight.SemiBold,
                                style = MaterialTheme.typography.labelLarge,
                                color = BentoGreenText
                            )
                        }
                        Column {
                            Text(
                                text = String.format(Locale.US, "$%.2f", result.monthly * 0.60f),
                                style = MaterialTheme.typography.headlineMedium,
                                fontWeight = FontWeight.SemiBold,
                                color = BentoGreenText
                            )
                            Text(
                                text = "MOBILE APPS",
                                style = MaterialTheme.typography.labelSmall,
                                fontWeight = FontWeight.Bold,
                                color = BentoGreenText.copy(alpha = 0.6f)
                            )
                        }
                    }
                }
            }
        }

        item {
            // Server Health & Latency Monitor Bento Card (White)
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(20.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .background(BentoBg, RoundedCornerShape(8.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("⚙️", fontSize = 16.sp)
                        }
                        Column {
                            Text(
                                text = "Server Health",
                                style = MaterialTheme.typography.bodyMedium,
                                fontWeight = FontWeight.Bold,
                                color = BentoTextPrimary
                            )
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(6.dp)
                                        .background(Color(0xFF22C55E), CircleShape)
                                )
                                Text(
                                    text = "99.9% Uptime",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = BentoTextSecondary
                                )
                            }
                        }
                    }
                    Column(horizontalAlignment = Alignment.End) {
                        Text(
                            text = "v1.2.4-stable",
                            style = MaterialTheme.typography.labelSmall,
                            fontFamily = FontFamily.Monospace,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = "API Response 42ms",
                            style = MaterialTheme.typography.labelSmall,
                            color = BentoTextSecondary
                        )
                    }
                }
            }
        }

        item {
            // Dark Placeholder Google AdSense Ad (Dark)
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoDark),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(60.dp),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.1f))
            ) {
                Box(
                    modifier = Modifier.fillMaxSize()
                ) {
                    Box(
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .background(Color(0xFFFFD600), RoundedCornerShape(bottomStart = 8.dp))
                            .padding(horizontal = 8.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = "AD",
                            color = Color.Black,
                            fontSize = 8.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Google AdSense Placeholder",
                            color = Color(0xFF9AA0A6),
                            style = MaterialTheme.typography.bodySmall,
                            fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                            letterSpacing = 1.5.sp
                        )
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "Full Stack Architecture & Ads Flow",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
        }

        item {
            // Visual Pipeline Bento Box
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        ArchitectureNode("Frontend\n(Compose / HTML)", Icons.Default.Devices, Color(0xFF38BDF8))
                        Icon(imageVector = Icons.Default.ArrowForward, contentDescription = null, tint = BentoBorderGray)
                        ArchitectureNode("Ad Networks\n(AdMob / AdSense)", Icons.Default.MonetizationOn, Color(0xFFF59E0B))
                        Icon(imageVector = Icons.Default.ArrowForward, contentDescription = null, tint = BentoBorderGray)
                        ArchitectureNode("Backend & DB\n(APIs / Room)", Icons.Default.Dns, Color(0xFF34D399))
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    Divider(color = BentoBorderGray)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "How it Works:",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.bodyMedium,
                        color = BentoTextPrimary
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    BulletPoint("1. Clients request layout and ad configurations from the backend API server.")
                    BulletPoint("2. The frontend renders layout components and contacts Google Ad Servers directly.")
                    BulletPoint("3. Impressions/clicks are tracked and recorded, updating dynamic telemetry inside your server database.")
                }
            }
        }

        item {
            // Policy Bento Box
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoCoral.copy(alpha = 0.4f)),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoCoralBorder.copy(alpha = 0.5f)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Lightbulb,
                            contentDescription = null,
                            tint = BentoCoralText
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Pro-Tip: ads.txt Policy Requirements",
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium,
                            color = BentoCoralText
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Always publish an 'ads.txt' file at the root of your domain (e.g. yoursite.com/ads.txt) declaring authorized sellers. Failure to deploy a correct ads.txt causes severe crawl errors and stops all ad serving.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = BentoCoralText.copy(alpha = 0.8f)
                    )
                }
            }
        }
    }
}


@Composable
fun ArchitectureNode(title: String, icon: ImageVector, color: Color) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            modifier = Modifier
                .size(48.dp)
                .background(color.copy(alpha = 0.15f), CircleShape)
                .border(2.dp, color, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(imageVector = icon, contentDescription = title, tint = color)
        }
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.bodySmall,
            fontWeight = FontWeight.SemiBold,
            textAlign = TextAlign.Center,
            fontSize = 10.sp,
            lineHeight = 12.sp
        )
    }
}

@Composable
fun BulletPoint(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.bodyMedium,
        color = BentoTextSecondary,
        modifier = Modifier.padding(vertical = 3.dp)
    )
}

// SECTION 2: ADSENSE WEB SIMULATION & GUIDES
@Composable
fun AdSenseScreen(viewModel: MainViewModel) {
    val selectedType by viewModel.selectedAdSenseType.collectAsStateWithLifecycle()
    val clientId by viewModel.adsenseClientId.collectAsStateWithLifecycle()
    val isResponsive by viewModel.adsenseResponsive.collectAsStateWithLifecycle()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BentoBg)
            .padding(16.dp)
            .testTag("adsense_screen"),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "Google AdSense Web Guide",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
            Text(
                text = "Configure parameters to view real-time responsive mock ad delivery styles on websites.",
                style = MaterialTheme.typography.bodyMedium,
                color = BentoTextSecondary
            )
        }

        item {
            // Live Control Panel Bento Card
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Simulator Settings",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleMedium,
                        color = BentoTextPrimary
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    OutlinedTextField(
                        value = clientId,
                        onValueChange = { viewModel.setAdSenseClientId(it) },
                        label = { Text("AdSense Client ID (data-ad-client)") },
                        modifier = Modifier.fillMaxWidth().testTag("adsense_client_id_input"),
                        singleLine = true
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = "Select Ad format Style:",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.bodyMedium,
                        color = BentoTextPrimary
                    )
                    Spacer(modifier = Modifier.height(6.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf("Banner", "In-Feed", "In-Article").forEach { type ->
                            FilterChip(
                                selected = selectedType == type,
                                onClick = { viewModel.setAdSenseType(type) },
                                label = { Text(type) },
                                modifier = Modifier.weight(1f).testTag("chip_$type")
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Responsive Layout Rendering",
                                fontWeight = FontWeight.SemiBold,
                                color = BentoTextPrimary
                            )
                            Text(
                                text = "Scale automatically based on container width",
                                style = MaterialTheme.typography.bodySmall,
                                color = BentoTextSecondary
                            )
                        }
                        Switch(
                            checked = isResponsive,
                            onCheckedChange = { viewModel.toggleAdSenseResponsive() },
                            modifier = Modifier.testTag("adsense_responsive_switch")
                        )
                    }
                }
            }
        }

        item {
            Text(
                text = "Mock Browser Layout Rendering",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
        }

        item {
            // Mock Browser Sandbox Frame in a beautifully rounded Bento Layout
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, BentoBorderGray, RoundedCornerShape(20.dp))
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0xFF0F172A))
            ) {
                // Browser URL address bar top
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFF1E293B))
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Box(modifier = Modifier.size(8.dp).background(Color(0xFFEF4444), CircleShape))
                        Box(modifier = Modifier.size(8.dp).background(Color(0xFFF59E0B), CircleShape))
                        Box(modifier = Modifier.size(8.dp).background(Color(0xFF10B981), CircleShape))
                    }
                    Spacer(modifier = Modifier.width(16.dp))
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .background(Color(0xFF0F172A), RoundedCornerShape(8.dp))
                            .padding(vertical = 4.dp, horizontal = 12.dp)
                    ) {
                        Text(
                            text = "https://www.devadguide-sandbox.io/blog",
                            color = Color(0xFF94A3B8),
                            fontSize = 11.sp,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                }

                // Browser content mockup containing ads
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.White)
                        .padding(16.dp)
                ) {
                    Text(
                        text = "10 Tips for Modern Full Stack Web Architecture",
                        color = Color(0xFF0F172A),
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                    Text(
                        text = "Published July 17, 2026 • Web monetization strategies",
                        color = Color(0xFF64748B),
                        fontSize = 10.sp
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = "Building solid software backends requires rigorous database optimization and clean code layouts. Let's explore how web architectures distribute components...",
                        color = Color(0xFF334155),
                        fontSize = 12.sp,
                        lineHeight = 18.sp
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // RENDER THE MOCK AD DEPENDING ON ADSENSE SELECTION
                    MockAdSenseRenderer(type = selectedType, clientId = clientId, responsive = isResponsive)

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = "Additionally, caching with local databases or Redis buffers relieves CPU pressure during surges. Integrating localized monetization systems allows robust growth...",
                        color = Color(0xFF334155),
                        fontSize = 12.sp,
                        lineHeight = 18.sp
                    )
                }
            }
        }

        item {
            Text(
                text = "Web Integration Code Recipe",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
        }

        item {
            val codeString = """
<!-- Step 1: Place Google AdSense Script once in your website's <head> -->
<script async src="https://pagead2.googleservices.com/pagead/js/adsbygoogle.js?client=$clientId"
     crossorigin="anonymous"></script>

<!-- Step 2: Paste this Ad tag where you want the advertisement to load -->
<ins class="adsbygoogle"
     style="display:${if (isResponsive) "block" else "inline-block"};"
     data-ad-client="$clientId"
     data-ad-slot="9876543210"
     data-ad-format="${selectedType.lowercase(Locale.getDefault())}"
     data-full-width-responsive="${if (isResponsive) "true" else "false"}"></ins>
     
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
            """.trimIndent()

            CodeSnippetViewer(
                code = codeString,
                title = "index.html (HTML & AdSense Script)"
            )
        }
    }
}

@Composable
fun MockAdSenseRenderer(type: String, clientId: String, responsive: Boolean) {
    val adHeight = when (type) {
        "Banner" -> 60.dp
        "In-Feed" -> 90.dp
        else -> 120.dp
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(adHeight)
            .background(Color(0xFFF8FAFC), RoundedCornerShape(6.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(6.dp))
            .padding(8.dp)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .background(Color(0xFF3B82F6), RoundedCornerShape(2.dp))
                            .padding(horizontal = 4.dp, vertical = 1.dp)
                    ) {
                        Text(text = "Ad", color = Color.White, fontSize = 8.sp, fontWeight = FontWeight.Bold)
                    }
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Google AdSense Responsive $type - $clientId",
                        color = Color(0xFF475569),
                        fontSize = 9.sp,
                        fontFamily = FontFamily.Monospace,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = "Ad Choices",
                    tint = Color(0xFF94A3B8),
                    modifier = Modifier.size(10.dp)
                )
            }

            Spacer(modifier = Modifier.height(4.dp))

            when (type) {
                "Banner" -> {
                    Row(
                        modifier = Modifier.fillMaxSize(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .background(Color(0xFFCBD5E1), RoundedCornerShape(4.dp))
                        )
                        Column(modifier = Modifier.weight(1f)) {
                            Text("Fast Server Hosting starting at $2.99/mo!", color = Color(0xFF1E293B), fontWeight = FontWeight.Bold, fontSize = 11.sp, maxLines = 1)
                            Text("Deploy full stack databases in 30 seconds globally.", color = Color(0xFF64748B), fontSize = 9.sp, maxLines = 1)
                        }
                        Button(
                            onClick = {},
                            modifier = Modifier.height(24.dp),
                            contentPadding = PaddingValues(horizontal = 8.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF3B82F6))
                        ) {
                            Text("Deploy", fontSize = 9.sp, color = Color.White, fontWeight = FontWeight.Bold)
                        }
                    }
                }
                "In-Feed" -> {
                    Row(
                        modifier = Modifier.fillMaxSize(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text("Code Cleaner & AI Linter Pro", color = Color(0xFF1E293B), fontWeight = FontWeight.Bold, fontSize = 12.sp, maxLines = 1)
                            Text("Automate pull request reviews and find memory leaks instantly.", color = Color(0xFF475569), fontSize = 10.sp, maxLines = 2, lineHeight = 12.sp)
                        }
                        Box(
                            modifier = Modifier
                                .size(50.dp)
                                .background(Color(0xFF94A3B8), RoundedCornerShape(8.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(imageVector = Icons.Default.BugReport, contentDescription = null, tint = Color.White, modifier = Modifier.size(24.dp))
                        }
                    }
                }
                else -> { // In-Article
                    Column(
                        modifier = Modifier.fillMaxSize(),
                        verticalArrangement = Arrangement.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .background(Color(0xFFF1F5F9), RoundedCornerShape(4.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(imageVector = Icons.Default.School, tint = Color(0xFF3B82F6), contentDescription = null)
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text("Become a Full-Stack Engineer in 12 Weeks", color = Color(0xFF0F172A), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                Text("Join next semester's developer cohort at NextSem Academy.", color = Color(0xFF475569), fontSize = 10.sp)
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("Ad Slot ID: 9876543210", fontSize = 8.sp, color = Color(0xFF94A3B8), fontFamily = FontFamily.Monospace)
                            Button(
                                onClick = {},
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                                contentPadding = PaddingValues(horizontal = 12.dp),
                                modifier = Modifier.height(28.dp)
                            ) {
                                Text("Learn More", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            }
                        }
                    }
                }
            }
        }
    }
}

// SECTION 3: ADMOB MOBILE SIMULATION & GUIDES
@Composable
fun AdMobScreen(viewModel: MainViewModel) {
    val showBannerAd by viewModel.showAdMobBanner.collectAsStateWithLifecycle()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BentoBg)
            .padding(16.dp)
            .testTag("admob_screen"),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "Google AdMob Mobile Guide",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
            Text(
                text = "Simulate native AdMob mobile formats inside Jetpack Compose and earn mock developer credits.",
                style = MaterialTheme.typography.bodyMedium,
                color = BentoTextSecondary
            )
        }

        item {
            // Simulator Controllers
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Trigger Mobile Ad Simulations",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleMedium,
                        color = BentoTextPrimary
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "Toggle Banner Ad (320x50)",
                                fontWeight = FontWeight.SemiBold,
                                color = BentoTextPrimary
                            )
                            Text(
                                text = "Renders persistent container at screen bottom",
                                style = MaterialTheme.typography.bodySmall,
                                color = BentoTextSecondary
                            )
                        }
                        Switch(
                            checked = showBannerAd,
                            onCheckedChange = { viewModel.toggleAdMobBanner(it) },
                            modifier = Modifier.testTag("admob_banner_switch")
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))
                    Divider(color = BentoBorderGray)
                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Button(
                            onClick = { viewModel.triggerInterstitial() },
                            colors = ButtonDefaults.buttonColors(containerColor = BentoBlueText),
                            modifier = Modifier.weight(1f).testTag("trigger_interstitial_btn")
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(imageVector = Icons.Default.Launch, contentDescription = null, tint = BentoWhite)
                                Spacer(modifier = Modifier.height(4.dp))
                                Text("Interstitial", color = BentoWhite, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                            }
                        }

                        Button(
                            onClick = { viewModel.triggerRewarded() },
                            colors = ButtonDefaults.buttonColors(containerColor = BentoGreenText),
                            modifier = Modifier.weight(1f).testTag("trigger_rewarded_btn")
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(imageVector = Icons.Default.Tv, contentDescription = null, tint = BentoWhite)
                                Spacer(modifier = Modifier.height(4.dp))
                                Text("Rewarded Video", color = BentoWhite, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                            }
                        }
                    }
                }
            }
        }

        item {
            Text(
                text = "AdMob Jetpack Compose Integration Recipes",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
        }

        item {
            val bannerCode = """
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdSize
import com.google.android.gms.ads.AdView

@Composable
fun AdMobBannerAd(modifier: Modifier = Modifier) {
    AndroidView(
        modifier = modifier.fillMaxWidth(),
        factory = { context ->
            AdView(context).apply {
                setAdSize(AdSize.BANNER)
                // Official Test Ad Unit ID for Banners
                adUnitId = "ca-app-pub-3940256099942544/6300978111"
                loadAd(AdRequest.Builder().build())
            }
        }
    )
}
            """.trimIndent()

            CodeSnippetViewer(
                code = bannerCode,
                title = "AdMobBanner.kt (Jetpack Compose View)"
            )
        }

        item {
            val rewardedCode = """
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

fun loadAndShowRewardedAd(context: Context, onRewardEarned: (Int) -> Unit) {
    val adRequest = AdRequest.Builder().build()
    
    // Official Test ID for Rewarded Ads
    RewardedAd.load(context, "ca-app-pub-3940256099942544/5224354917", adRequest,
        object : RewardedAdLoadCallback() {
            override fun onAdLoaded(rewardedAd: RewardedAd) {
                rewardedAd.show(context as Activity) { rewardItem ->
                    // Callback fired on complete watch
                    onRewardEarned(rewardItem.amount)
                }
            }
            override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                Log.e("AdMob", "Failed to load rewarded ad: " + loadAdError.message)
            }
        }
    )
}
            """.trimIndent()

            CodeSnippetViewer(
                code = rewardedCode,
                title = "AdMobRewarded.kt (Callback Integration)"
            )
        }
    }
}

// SECTION 4: AD REVENUE DASHBOARD & SLIDER CALCULATOR
@Composable
fun CalculatorScreen(viewModel: MainViewModel) {
    val traffic by viewModel.dailyTraffic.collectAsStateWithLifecycle()
    val ctr by viewModel.clickThroughRate.collectAsStateWithLifecycle()
    val cpc by viewModel.costPerClick.collectAsStateWithLifecycle()
    val cpm by viewModel.cpmValue.collectAsStateWithLifecycle()

    val result = viewModel.calculateEarnings()

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BentoBg)
            .padding(16.dp)
            .testTag("calculator_screen"),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "Revenue Projection Calculator",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
            Text(
                text = "Interact with sliders to estimate full stack web and mobile app ad earnings globally.",
                style = MaterialTheme.typography.bodyMedium,
                color = BentoTextSecondary
            )
        }

        item {
            // Earnings Result Panel Card: Styled as signature Coral Bento box!
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoCoral),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoCoralBorder),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Estimated Payout Projection",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = BentoCoralText.copy(alpha = 0.8f)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = String.format(Locale.US, "$%.2f", result.monthly),
                        style = MaterialTheme.typography.displayMedium.copy(letterSpacing = (-1).sp),
                        fontWeight = FontWeight.Bold,
                        color = BentoCoralText
                    )
                    Text(
                        text = "Estimated / Monthly",
                        style = MaterialTheme.typography.bodySmall,
                        color = BentoCoralText.copy(alpha = 0.7f)
                    )

                    Spacer(modifier = Modifier.height(16.dp))
                    Divider(color = BentoCoralBorder.copy(alpha = 0.3f))
                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceAround
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = String.format(Locale.US, "$%.2f", result.daily),
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.titleMedium,
                                color = BentoCoralText
                            )
                            Text("Daily", fontSize = 11.sp, color = BentoCoralText.copy(alpha = 0.7f))
                        }

                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = String.format(Locale.US, "$%.2f", result.yearly),
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.titleMedium,
                                color = BentoCoralText
                            )
                            Text("Annual", fontSize = 11.sp, color = BentoCoralText.copy(alpha = 0.7f))
                        }

                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "${result.clicks}",
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.titleMedium,
                                color = BentoCoralText
                            )
                            Text("Daily Clicks", fontSize = 11.sp, color = BentoCoralText.copy(alpha = 0.7f))
                        }
                    }
                }
            }
        }

        item {
            Text(
                text = "Configure Traffic & CTR Parameters",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
        }

        item {
            // Styled as clean White Bento Card with Border
            Card(
                colors = CardDefaults.cardColors(containerColor = BentoWhite),
                shape = RoundedCornerShape(24.dp),
                border = BorderStroke(1.dp, BentoBorderGray),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    // Traffic Slider
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Daily Page Views / Traffic:",
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = "${traffic.toInt()}",
                            fontWeight = FontWeight.Bold,
                            color = BentoCoralText
                        )
                    }
                    Slider(
                        value = traffic,
                        onValueChange = { viewModel.updateDailyTraffic(it) },
                        valueRange = 100f..250000f,
                        modifier = Modifier.testTag("traffic_slider"),
                        colors = SliderDefaults.colors(
                            thumbColor = BentoCoralText,
                            activeTrackColor = BentoCoralText.copy(alpha = 0.7f),
                            inactiveTrackColor = BentoBorderGray
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // CTR Slider
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Click Through Rate (CTR):",
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = String.format(Locale.US, "%.1f%%", ctr),
                            fontWeight = FontWeight.Bold,
                            color = BentoCoralText
                        )
                    }
                    Slider(
                        value = ctr,
                        onValueChange = { viewModel.updateCTR(it) },
                        valueRange = 0.1f..15.0f,
                        modifier = Modifier.testTag("ctr_slider"),
                        colors = SliderDefaults.colors(
                            thumbColor = BentoCoralText,
                            activeTrackColor = BentoCoralText.copy(alpha = 0.7f),
                            inactiveTrackColor = BentoBorderGray
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // CPC Slider
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Cost Per Click (CPC):",
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = String.format(Locale.US, "$%.2f", cpc),
                            fontWeight = FontWeight.Bold,
                            color = BentoCoralText
                        )
                    }
                    Slider(
                        value = cpc,
                        onValueChange = { viewModel.updateCPC(it) },
                        valueRange = 0.05f..3.50f,
                        modifier = Modifier.testTag("cpc_slider"),
                        colors = SliderDefaults.colors(
                            thumbColor = BentoCoralText,
                            activeTrackColor = BentoCoralText.copy(alpha = 0.7f),
                            inactiveTrackColor = BentoBorderGray
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // CPM Slider
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Cost Per Thousand Views (CPM):",
                            fontWeight = FontWeight.SemiBold,
                            fontSize = 14.sp,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = String.format(Locale.US, "$%.2f", cpm),
                            fontWeight = FontWeight.Bold,
                            color = BentoCoralText
                        )
                    }
                    Slider(
                        value = cpm,
                        onValueChange = { viewModel.updateCPM(it) },
                        valueRange = 0.10f..10.00f,
                        modifier = Modifier.testTag("cpm_slider"),
                        colors = SliderDefaults.colors(
                            thumbColor = BentoCoralText,
                            activeTrackColor = BentoCoralText.copy(alpha = 0.7f),
                            inactiveTrackColor = BentoBorderGray
                        )
                    )
                }
            }
        }
    }
}

// SECTION 5: ROOM LOCAL DATABASE SAVED CONFIGS & NOTES
@Composable
fun ConfigsScreen(viewModel: MainViewModel) {
    val context = LocalContext.current
    val configs by viewModel.savedConfigs.collectAsStateWithLifecycle()

    var showAddDialog by remember { mutableStateOf(false) }
    var titleInput by remember { mutableStateOf("") }
    var adUnitIdInput by remember { mutableStateOf("") }
    var notesInput by remember { mutableStateOf("") }
    var selectedPlatform by remember { mutableStateOf("Web (AdSense)") }

    Box(modifier = Modifier.fillMaxSize().background(BentoBg).testTag("configs_screen")) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Text(
                text = "My Saved Project Notebook",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = BentoTextPrimary
            )
            Text(
                text = "Keep secure logs of your actual app identifiers, production ad slots, and integration notes locally using your SQLite Room Database.",
                style = MaterialTheme.typography.bodyMedium,
                color = BentoTextSecondary
            )

            Spacer(modifier = Modifier.height(16.dp))

            if (configs.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = Icons.Default.FolderOpen,
                            contentDescription = "Empty notebooks",
                            tint = BentoBorderGray,
                            modifier = Modifier.size(64.dp)
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = "No saved projects yet",
                            fontWeight = FontWeight.SemiBold,
                            color = BentoTextPrimary
                        )
                        Text(
                            text = "Tap the float action button (+) below to save your first Ad unit mapping.",
                            style = MaterialTheme.typography.bodySmall,
                            color = BentoTextSecondary,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            } else {
                LazyColumn(
                    modifier = Modifier.weight(1f).testTag("configs_lazy_column"),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(configs) { config ->
                        Card(
                            modifier = Modifier.fillMaxWidth().testTag("config_card_${config.id}"),
                            colors = CardDefaults.cardColors(containerColor = BentoWhite),
                            shape = RoundedCornerShape(24.dp),
                            border = BorderStroke(1.dp, BentoBorderGray)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = config.title,
                                            fontWeight = FontWeight.Bold,
                                            style = MaterialTheme.typography.titleMedium,
                                            color = BentoTextPrimary,
                                            maxLines = 1,
                                            overflow = TextOverflow.Ellipsis
                                        )
                                        Row(
                                            verticalAlignment = Alignment.CenterVertically,
                                            modifier = Modifier.padding(top = 4.dp)
                                        ) {
                                            Box(
                                                modifier = Modifier
                                                    .background(
                                                        if (config.platform.contains("Web")) BentoBlue.copy(alpha = 0.4f)
                                                        else BentoGreen.copy(alpha = 0.4f),
                                                        RoundedCornerShape(6.dp)
                                                    )
                                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                                            ) {
                                                Text(
                                                    text = config.platform,
                                                    color = if (config.platform.contains("Web")) BentoBlueText else BentoGreenText,
                                                    fontSize = 10.sp,
                                                    fontWeight = FontWeight.Bold
                                                )
                                            }
                                        }
                                    }

                                    IconButton(
                                        onClick = { viewModel.deleteConfig(config) },
                                        modifier = Modifier.testTag("delete_config_${config.id}")
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.Delete,
                                            contentDescription = "Delete config",
                                            tint = Color(0xFFEF4444)
                                        )
                                    }
                                }

                                Spacer(modifier = Modifier.height(12.dp))

                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(BentoBg, RoundedCornerShape(12.dp))
                                        .border(1.dp, BentoBorderGray, RoundedCornerShape(12.dp))
                                        .padding(horizontal = 12.dp, vertical = 8.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "Ad Slot / Unit ID:",
                                        style = MaterialTheme.typography.bodySmall,
                                        fontWeight = FontWeight.SemiBold,
                                        color = BentoTextSecondary
                                    )
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Text(
                                        text = config.adUnitId,
                                        style = MaterialTheme.typography.bodySmall,
                                        fontFamily = FontFamily.Monospace,
                                        maxLines = 1,
                                        overflow = TextOverflow.Ellipsis,
                                        color = BentoTextPrimary
                                    )
                                }

                                if (config.notes.isNotEmpty()) {
                                    Spacer(modifier = Modifier.height(10.dp))
                                    Text(
                                        text = "Notes:",
                                        style = MaterialTheme.typography.bodySmall,
                                        fontWeight = FontWeight.SemiBold,
                                        color = BentoTextSecondary
                                    )
                                    Text(
                                        text = config.notes,
                                        style = MaterialTheme.typography.bodySmall,
                                        color = BentoTextPrimary,
                                        modifier = Modifier.padding(top = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        // Floating Action Button to Add Configs
        FloatingActionButton(
            onClick = { showAddDialog = true },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(24.dp)
                .testTag("add_config_fab"),
            containerColor = BentoCoral,
            contentColor = BentoCoralText,
            shape = RoundedCornerShape(16.dp)
        ) {
            Icon(imageVector = Icons.Default.Add, contentDescription = "Add New Config")
        }

        // Room Create Dialog Form
        if (showAddDialog) {
            AlertDialog(
                onDismissRequest = { showAddDialog = false },
                title = { Text("New Project Ad Setup", fontWeight = FontWeight.Bold) },
                text = {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        OutlinedTextField(
                            value = titleInput,
                            onValueChange = { titleInput = it },
                            label = { Text("Project / App Name") },
                            modifier = Modifier.fillMaxWidth().testTag("input_title"),
                            singleLine = true
                        )

                        Text("Select Integration Platform:", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.bodyMedium)
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            listOf("Web (AdSense)", "Mobile (AdMob)").forEach { plat ->
                                FilterChip(
                                    selected = selectedPlatform == plat,
                                    onClick = { selectedPlatform = plat },
                                    label = { Text(plat) },
                                    modifier = Modifier.weight(1f).testTag("platform_chip_$plat")
                                )
                            }
                        }

                        OutlinedTextField(
                            value = adUnitIdInput,
                            onValueChange = { adUnitIdInput = it },
                            label = { Text("Ad Unit ID / Publisher Code") },
                            placeholder = { Text("e.g. ca-pub-XXXXXXXXXXXXXXXX") },
                            modifier = Modifier.fillMaxWidth().testTag("input_unit_id"),
                            singleLine = true
                        )

                        OutlinedTextField(
                            value = notesInput,
                            onValueChange = { notesInput = it },
                            label = { Text("Custom Setup Notes") },
                            placeholder = { Text("e.g. Remember to publish ads.txt") },
                            modifier = Modifier.fillMaxWidth().testTag("input_notes"),
                            maxLines = 3
                        )
                    }
                },
                confirmButton = {
                    Button(
                        onClick = {
                            if (titleInput.isNotEmpty() && adUnitIdInput.isNotEmpty()) {
                                viewModel.saveConfig(
                                    title = titleInput,
                                    platform = selectedPlatform,
                                    adUnitId = adUnitIdInput,
                                    notes = notesInput
                                )
                                // Reset fields
                                titleInput = ""
                                adUnitIdInput = ""
                                notesInput = ""
                                showAddDialog = false
                            } else {
                                Toast.makeText(context, "Please fill in Name and Ad ID fields", Toast.LENGTH_SHORT).show()
                            }
                        },
                        modifier = Modifier.testTag("save_config_confirm")
                    ) {
                        Text("Save to Room DB")
                    }
                },
                dismissButton = {
                    TextButton(onClick = { showAddDialog = false }) {
                        Text("Cancel")
                    }
                }
            )
        }
    }
}
