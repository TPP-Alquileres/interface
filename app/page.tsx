"use client";

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Seguros para propiedas
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Seguros para alquileres de propiedades de forma rápida, confiable y con fondos respaldados en la blockchain
                  </p>
                </div>

              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/seguros.jpeg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Inquilino</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Consegui un seguro en pocos pasos de forma online y accesible para alquilar una propiedad.
              </p>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="400"
                src="/seguros.jpeg"
                width="700"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Propietario</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Protege tu propiedad con seguros confiables y con los fondos respaldados en la blockchain garantizando el pago en caso de inconvenientes.
              </p>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="400"
                src="/seguros.jpeg"
                width="700"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10 ">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Inversor</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Potencia tu capital invirtien
              </p>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="400"
                src="/seguros.jpeg"
                width="700"
              />
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400"></p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos y condiciones
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
