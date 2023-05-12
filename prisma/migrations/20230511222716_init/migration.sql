-- CreateTable
CREATE TABLE "Guard" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passhash" TEXT NOT NULL,
    "bio" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "name" TEXT,
    "avatar" TEXT,
    "rate" INTEGER,
    "avgRating" DOUBLE PRECISION,
    "occupation" TEXT,

    CONSTRAINT "Guard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarded" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "passhash" TEXT NOT NULL,
    "name" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "avatar" TEXT,
    "avgRating" DOUBLE PRECISION,

    CONSTRAINT "Guarded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hire" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "fees" INTEGER,
    "discounts" INTEGER,
    "payment" TEXT NOT NULL,
    "endDateTime" TIMESTAMP(3),
    "startDateTime" TIMESTAMP(3),
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "guardId" INTEGER NOT NULL,
    "guardedId" INTEGER NOT NULL,

    CONSTRAINT "Hire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "rating" INTEGER NOT NULL,
    "guardId" INTEGER NOT NULL,
    "guardedId" INTEGER NOT NULL,
    "hireId" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuardFeatures" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guardId" INTEGER NOT NULL,
    "yearsOfMilitaryExpeirence" INTEGER,
    "hasGeoTrackingEnabled" BOOLEAN,
    "hasMicrophoneEnabled" BOOLEAN,
    "hasBodyCamEnabled" BOOLEAN,
    "hasInsurance" BOOLEAN,
    "hasBackgroundCheck" BOOLEAN,
    "hasASRBCertification" BOOLEAN,
    "hasAPOSTCertification" BOOLEAN,
    "hasCprCertification" BOOLEAN,
    "hasFirstAidCertification" BOOLEAN,
    "hasOwnTransportation" BOOLEAN,
    "hasOwnWeapon" BOOLEAN,
    "hasOwnUniform" BOOLEAN,

    CONSTRAINT "GuardFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guard_email_key" ON "Guard"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guarded_email_key" ON "Guarded"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GuardFeatures_guardId_key" ON "GuardFeatures"("guardId");

-- AddForeignKey
ALTER TABLE "Hire" ADD CONSTRAINT "Hire_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hire" ADD CONSTRAINT "Hire_guardedId_fkey" FOREIGN KEY ("guardedId") REFERENCES "Guarded"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_guardedId_fkey" FOREIGN KEY ("guardedId") REFERENCES "Guarded"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_hireId_fkey" FOREIGN KEY ("hireId") REFERENCES "Hire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardFeatures" ADD CONSTRAINT "GuardFeatures_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
