"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Shield, FileText, Lock, Trash2, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProfileViewProps {
  username: string
}

export default function ProfileView({ username }: ProfileViewProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    router.push("/")
  }

  const handleDeleteAccount = () => {
    // Handle account deletion
    router.push("/")
  }

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Profile Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Account</h1>
          <p className="text-lg text-gray-600">Manage your Ellis account and preferences</p>
        </div>

        {/* Account Information */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-semibold text-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Personal Information</CardTitle>
                <CardDescription className="text-gray-600">Your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Username</p>
                    <p className="text-base text-gray-900">{username}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <Separator />

              <div className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Password</p>
                    <p className="text-base text-gray-900">••••••••</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal & Privacy */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Legal & Privacy</CardTitle>
            <CardDescription className="text-gray-600">Review our policies and terms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500 group-hover:text-[#1e3a5f] transition-colors" />
                <span className="text-base text-gray-900">Privacy Policy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1e3a5f] transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-500 group-hover:text-[#1e3a5f] transition-colors" />
                <span className="text-base text-gray-900">Terms of Service</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1e3a5f] transition-colors" />
            </button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Account Actions</CardTitle>
            <CardDescription className="text-gray-600">Manage your account status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 border-gray-300 hover:bg-gray-50 bg-transparent"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Log Out</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12 border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 bg-transparent"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Account</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
            <AlertDialogDescription>You will need to log in again to access Ellis.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-[#1e3a5f] hover:bg-[#152d4a]">
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All of your data will be permanently deleted from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
