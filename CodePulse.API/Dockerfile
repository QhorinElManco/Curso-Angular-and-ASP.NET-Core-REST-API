FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8000
ENV ASPNETCORE_URLS=http://+:8000
RUN groupadd -g 2000 dotnet && useradd -m -u 2000 -g 2000 dotnet
USER dotnet

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG DOTNET_SKIP_POLICY_LOADING=true
WORKDIR /src

#COPY ["*.csproj", "./"]
#RUN dotnet restore "CodePulse.API.csproj"
COPY . .
RUN dotnet build "CodePulse.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "CodePulse.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS production
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CodePulse.API.dll"]

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development
WORKDIR /app
#COPY *.csproj ./
#RUN dotnet restore
COPY . ./
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_WATCH_RELOAD_ON_SAVE=true
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://+:8000"]