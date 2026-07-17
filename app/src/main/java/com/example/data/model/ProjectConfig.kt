package com.example.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "project_configs")
data class ProjectConfig(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val platform: String, // "Web" (AdSense) or "Mobile" (AdMob)
    val adUnitId: String,
    val notes: String,
    val timestamp: Long = System.currentTimeMillis()
)
